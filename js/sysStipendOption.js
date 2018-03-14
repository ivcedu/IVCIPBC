var m_table;
var stipend_option_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && isUserHasAdminAccess()) {
        getLoginInfo();
        getStipendOptionList();
    }
    else {
        sessionStorage.clear();
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // i-checks initialize /////////////////////////////////////////////////////
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_stipend_option_list').DataTable({ paging: false, bInfo: false, responsive: true, columnDefs:[{ className: "dt-center", orderable: false, targets: 2 }], 
                                                        dom: '<"html5buttons"B>lTfgitp',
                                                        buttons: [{ extend: 'copy'}, {extend: 'csv'}, {extend: 'excel', title: 'Stipend_Option_List'}, {extend: 'pdf', title: 'Stipend_Option_List'},
                                                                  {extend: 'print', customize: function (win){
                                                                          $(win.document.body).addClass('white-bg');
                                                                          $(win.document.body).css('font-size', '10px');
                                                                          $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');}
                                                                  }]
                                            });
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });
    
    // new stipend option button click /////////////////////////////////////////
    $('#btn_new_stipend_option').click(function() {
        stipend_option_id = "";
        clearModalSection();
        $('#mod_stipend_option_header').html("New Stipend Option Setting");
        $("#mod_stipend_option_active").iCheck('check');
        $('#mod_stipend_option_setting').modal('show');
        return false;
    });
    
    // table stipend option row edit click /////////////////////////////////////
    $('table').on('click', 'a[id^="stipend_option_id_"]', function(e) {
        e.preventDefault();
        stipend_option_id = $(this).attr('id').replace("stipend_option_id_", ""); 
        var result = new Array();
        result = db_getStipendOptionByID(stipend_option_id);
        
        clearModalSection();
        $('#mod_user_header').html("Edit Stipend Option Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_stipend_option_active").iCheck('check');
        }
        else {
            $("#mod_stipend_option_active").iCheck('unchecke');
        }
        $('#mod_stipend_option').val(result[0]['StipendOption']);
        $('#mod_stipend_option_setting').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_stipend_option_save').click(function() { 
        var stipend_optioni_active = ($('#mod_stipend_option_active').is(':checked') ? true : false);
        var stipend_option = $.trim($('#mod_stipend_option').val());
        
        if (stipend_option_id === "") {
            if (!stipendOptionValidation()) {
                return false;
            }
            else {
                if (db_insertStipendOption(stipend_optioni_active, stipend_option) === "") {
                    $('#mod_stipend_option_setting').modal('hide');
                    var str_msg = "DB system error INSERT STIPEND_OPTION";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_ipbc_loginName'), "New stipend option been added: " + stipend_option);
                }
            }
        }
        else {
            if (!db_updateStipendOptionByID(stipend_option_id, stipend_optioni_active, stipend_option)) {
                $('#mod_stipend_option_setting').modal('hide');
                var str_msg = "DB system error UPDATE STIPEND_OPTION - StpendOptionID: " + stipend_option_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_ipbc_loginName'), "Stipend option has been updated StipendOptionID: " + stipend_option_id + " - " + stipend_option);
            }
        }
        
        getStipendOptionList();
        $('#mod_stipend_option_setting').modal('hide');
        return false;
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_ipbc_loginName');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_stipend_option_header').html("");
    $('#mod_stipend_option_active').iCheck('uncheck');
    $('#mod_stipend_option').val("");
}

function stipendOptionValidation() {
    if ($.trim($('#mod_stipend_option').val()) === "") {
        swal({title: "Error", text: "Stipend Option is a required field", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////
function getStipendOptionList() {
    var result = new Array(); 
    result = db_getStipendOptionListDataTable();
    
    setTimeout(function() { 
        m_table.clear();
        m_table.rows.add(result).draw();
    }, 10);
}