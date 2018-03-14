var m_table;
var inst_user_name = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        if (isUserHasAdminAccess()) {
            $('#system_option').show();
        }
        getLoginInfo();
        getStipendOptionList();
    }
    else {
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    // auto size initialize ////////////////////////////////////////////////////
    autosize($('.autogrow'));
    
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_courses_list').DataTable({ paging: false, bInfo: false, responsive: true, 
                                                 dom: '<"html5buttons"B>lTfgitp',
                                                 buttons: [{ extend: 'copy'}, {extend: 'csv'}, {extend: 'excel', title: 'Courses_History'}, {extend: 'pdf', title: 'Courses_History'},
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
        inst_user_name = "";
        window.open('login.html', '_self');
        return false;
    });
    
    // instructor search button click //////////////////////////////////////////
    $('#btn_search').click(function() {
//        $('#stipend_section').removeClass('animated shake');
        if (!searchValidation()) {
            return false;
        }
        
        startSpinning();
        setTimeout(function() { 
            inst_user_name = $.trim($('#inst_user_name').val());
            var result = new Array();
            result = tardis_getInstructorByUserID(inst_user_name);

            if (result.length !== 1) {
                swal({title: "Error", text: "Instructor cannot find", type: "error"});
                clearStipendSection();
                m_table.clear().draw();
            }
            else {
                getInstStipend();
                getInstCoursesHistoryList(inst_user_name);
                $('#instructor_name').html(result[0]['FirstName'] + " " + result[0]['LastName']);
                $('#instructor_id').html(result[0]['EmployeeID']);
            }

            stopSpinning();
        }, 1500);
        
        this.blur();
        return false;
    });
   
    // stipend save button click ///////////////////////////////////////////////
    $('#btn_stipend_save').click(function() {
        if (inst_user_name === "") {
            swal({title: "Error", text: "Please search instructor username first", type: "error"});
            clearStipendSection();
            m_table.clear().draw();
            return false;
        }
        if (!stipendValidation()) {
            return false;
        }
        
        var stipend_option_id = $('#stipend_option_list').val();
        var stipend_option_name = $('#stipend_option_list option:selected').text();
        var comments = $.trim($('#comments').val());
        if (comments !== "") {
            comments = "\n" + comments;
        }
        
        var result = new Array();
        result = db_getStipendByInstructor(inst_user_name);
        
        var login_id = sessionStorage.getItem('ss_ipbc_login_id');
        var stipend_id = "";
        if (result.length === 0) {
            stipend_id = db_insertStipend(stipend_option_id, login_id, inst_user_name, comments);
            if (stipend_id === "") {
                var str_msg = "DB system error INSERT STIPEND";
                return dbSystemErrorHandling(str_msg);
            }
        }
        else {
            stipend_id = result[0]['StipendID'];            
            if (!db_updateStipendByID(stipend_id, stipend_option_id, login_id, inst_user_name, comments)) {
                var str_msg = "DB system error UPDATE STIPEND - StipendID: " + stipend_id;
                return dbSystemErrorHandling(str_msg);
            }
        }

        if (db_insertStipendLog(stipend_id, login_id, "Stipend Option has been updated: <b>" + stipend_option_name + "</b>" + comments) === "") {
            var str_msg = "DB system error INSERT STIPEND_LOG";
            return dbSystemErrorHandling(str_msg);
        }
        else {
            swal({title: "Saved!", text: "Paying a stipend has been save successfuly", type: "success"});
            getInstStipendLog(stipend_id);
        }
        
        return false;
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function startSpinning() {
    $('#spinner_loader').show();
    $('.wrapper-content').css('opacity', '0.5');
    $('#spinner_loader_img').addClass('preloader__spinner');
}

function stopSpinning() {
    $('#spinner_loader').hide();
    $('.wrapper-content').css('opacity', '1');
    $('#spinner_loader_img').removeClass('preloader__spinner');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_ipbc_loginName');
    $('#login_user').html(login_name);
}

function getStipendOptionList() {
    var result = new Array();
    result = db_getStipendOptionListActive();
    
    $('#stipend_option_list').empty();
    var html = "<option value='0'>Select...</option>";
    for (var i = 0; i < result.length; i++) {
        html += "<option value='" + result[i]['StipendOptionID']  + "'>" + result[i]['StipendOption'] + "</option>";
    }
    
    $('#stipend_option_list').append(html);
}

function clearStipendSection() {
    $('#instructor_name').html("");
    $('#stipend_option_list').val("0");
    $('#comments').val("");
    $('#stipend_history_log').html("");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function searchValidation() {
    if ($.trim($('#inst_user_name').val()) === "") {
        swal({title: "Error", text: "Instructor username is a required field", type: "error"});
        clearStipendSection();
        inst_user_name = "";
        return false;
    }
    
    return true;
}

function stipendValidation() {
    if ($('#stipend_option_list').val() === "0") {
        swal({title: "Error", text: "Stipend Option is a required field", type: "error"});
        return false;
    }
    
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getInstStipend() {
    var result = new Array();
    result = db_getStipendByInstructor(inst_user_name);
    
    if (result.length === 1) {
        $('#stipend_option_list').val(result[0]['StipendOptionID']);
//        $('#comments').val(result[0]['Comments']);
        var stipend_id = result[0]['StipendID'];
        getInstStipendLog(stipend_id);
        $('#tab_section_paying_stipend').removeClass('active');
        $('#tab_section_stipend_history').addClass('active');
        $('#tab_paying_stipend').removeClass('active');
        $('#tab_stipend_history').addClass('active');

//        $('#stipend_section').addClass('animated shake');
    }
    else {
        clearStipendSection();
        $('#tab_section_paying_stipend').addClass('active');
        $('#tab_section_stipend_history').removeClass('active');
        $('#tab_paying_stipend').addClass('active');
        $('#tab_stipend_history').removeClass('active');
    }
}

function getInstStipendLog(stipend_id) {
    var result = new Array();
    result = db_getStipendLogByStipendID(stipend_id);
    
    $("#stipend_history_log").html("");
    var html = "";
    for (var i = 0; i < result.length; i++) {
        var dt_stamp = convertDBDateTimeToString(result[i]['DTStamp']);
        var login_name = result[i]['UserName'];
        var comments = result[i]['Comments'];
        html += login_name + " : " + dt_stamp + "<br/>" + comments.replace(/\n/g, "<br/>") + "<br/><br/>";
    }
    $("#stipend_history_log").html(html);
}

function getInstCoursesHistoryList(instructor) {
    var result = new Array(); 
    result = db_getCoursesHistoryListByUser(instructor);
    
    m_table.clear();
    m_table.rows.add(result).draw();
}