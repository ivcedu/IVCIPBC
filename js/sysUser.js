var m_table;
var user_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && userAccessLevel() === "1") {
        getLoginInfo();
        getUserAccessListActive();
        getUserList();
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
    m_table = $('#tbl_user_list').DataTable({ paging: false, bInfo: false, responsive: true, columnDefs:[{ className: "dt-center", orderable: false, targets: 4 }],
                                              dom: '<"html5buttons"B>lTfgitp',
                                              buttons: [{ extend: 'copy'}, {extend: 'csv'}, {extend: 'excel', title: 'Access_User_List'}, {extend: 'pdf', title: 'Access_User_List'},
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
    
    // new admin button click //////////////////////////////////////////////////
    $('#btn_new_user').click(function() {
        user_id = "";
        clearModalSection();
        $('#mod_user_header').html("New User Setting");
        $("#mod_user_active").iCheck('check');
        $('#mod_user_setting').modal('show');
        return false;
    });
    
    // table user row edit click ///////////////////////////////////////////////
    $('table').on('click', 'a[id^="user_id_"]', function(e) {
        e.preventDefault();
        user_id = $(this).attr('id').replace("user_id_", ""); 
        var result = new Array();
        result = db_getUserByID(user_id);
        
        clearModalSection();
        $('#mod_user_header').html("Edit User Setting");
        if (result[0]['Active'] === "1") {
            $("#mod_user_active").iCheck('check');
        }
        else {
            $("#mod_user_active").iCheck('unchecke');
        }
        $('#mod_user_mame').val(result[0]['UserName']);
        $('#mod_user_email').val(result[0]['UserEmail']);
        $('#mod_access_level').val(result[0]['UserAccessID']);
        $('#mod_user_setting').modal('show');
        return false;
    });
    
    // modal save button click /////////////////////////////////////////////////
    $('#mod_btn_user_save').click(function() { 
        var user_active = ($('#mod_user_active').is(':checked') ? true : false);
        var user_access_id = $('#mod_access_level').val();
        var user_name = $.trim($('#mod_user_mame').val());
        var user_email = $.trim($('#mod_user_email').val());
        
        if (user_id === "") {
            if (!userValidation()) {
                return false;
            }
            else {
                if (db_insertUser(user_active, user_access_id, user_name, user_email) === "") {
                    $('#mod_user_setting').modal('hide');
                    var str_msg = "DB system error INSERT USER";
                    return dbSystemErrorHandling(str_msg);
                }
                else {
                    db_insertSystemLog(sessionStorage.getItem('ss_ipbc_loginName'), "New user has been added: " + user_name + " - " + user_email);
                }
            }
        }
        else {
            if (!db_updateUserByID(user_id, user_active, user_access_id, user_name, user_email)) {
                $('#mod_user_setting').modal('hide');
                var str_msg = "DB system error UPDATE USER - UserID: " + user_id;
                return dbSystemErrorHandling(str_msg);
            }
            else {
                db_insertSystemLog(sessionStorage.getItem('ss_ipbc_loginName'), "User has been updated AdminID: " + user_id + " - " + user_name + " - " + user_email);
            }
        }
        
        getUserList();
        $('#mod_user_setting').modal('hide');
        return false;
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_ipbc_loginName');
    $('#login_user').html(login_name);
}

function getUserAccessListActive() {
    var result = new Array();
    result = db_getUserAccessListActive();
    
    $('#mod_access_level').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['UserAccessID']  + "'>" + result[i]['UserAccess'] + "</option>";
    }
    $('#mod_access_level').append(html);
}

////////////////////////////////////////////////////////////////////////////////
function clearModalSection() {
    $('#mod_user_header').html("");
    $('#mod_user_active').iCheck('uncheck');
    $('#mod_user_mame').val("");
    $('#mod_user_email').val("");
    $('#mod_access_level').val("0");
}

function userValidation() {
    if ($.trim($('#mod_user_mame').val()) === "") {
        swal({title: "Error", text: "User name is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#mod_user_email').val()) === "") {
        swal({title: "Error", text: "User email is a required field", type: "error"});
        return false;        
    }
    if ($('#mod_access_level').val() === "0") {
        swal({title: "Error", text: "User access level is a required field", type: "error"});
        return false;
    }

    var result = new Array();
    result = db_getUserByEmail($.trim($('#mod_user_email').val()));
    if (result.length === 1) {
        swal({title: "Error", text: "User email " + $('#mod_user_email').val() + " already exist", type: "error"});
        return false;
    }

    return true;
}

////////////////////////////////////////////////////////////////////////////////
function getUserList() {
    var result = new Array(); 
    result = db_getUserListDataTable();
    
    setTimeout(function() { 
        m_table.clear();
        m_table.rows.add(result).draw();
    }, 10);
}