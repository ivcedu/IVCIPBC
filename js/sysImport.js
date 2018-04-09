var m_table;
var user_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null && userAccessLevel() === "1") {
        getLoginInfo();
    }
    else {
        sessionStorage.clear();
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('#nav_logout').click(function() {
        sessionStorage.clear();
        window.open('login.html', '_self');
        return false;
    });    
    
    // new admin button click //////////////////////////////////////////////////
    $('#btn_import').click(function() {
        if (!inputValidation()) {
            return false;
        }
        if (!csvImportFileValidation()) {
            return false;
        }
        
        var term_code = removeIllegalCharacters($.trim($('#term_code').val()));
        if(!db_deleteCanvasByTermCode(term_code)) {
            var str_msg = "DB system error DELETE CANVAS DATA BY TERM_CODE";
            return dbSystemErrorHandling(str_msg);
        }
        
        startSpinning();
        setTimeout(function() {
            if (insertCSVImportFileAttachment()) {
                swal({title: "Success!", text: "Import to Canvas table has been completed", type: "success"});
            }
            stopSpinning();
        }, 1500);
        
        return false;
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function startSpinning() {
    $('.wrapper-content').css('opacity', '0.5');
    $('#spinner_loader_img').addClass('preloader__spinner');
    $('#spinner_loader').show();
}

function stopSpinning() {
    $('.wrapper-content').css('opacity', '1');
    $('#spinner_loader_img').removeClass('preloader__spinner');
    $('#spinner_loader').hide();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_ipbc_loginName');
    $('#login_user').html(login_name);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function inputValidation() {
    if ($.trim($('#term_code').val()) === "") {
        swal({title: "Error", text: "TermCode is a required field", type: "error"});
        return false;
    }
    if ($.trim($('#term_code').val()).length !== 5) {
        swal({title: "Error", text: "TermCode is a wrong format", type: "error"});
        return false;
    }
    
    return true;
}

function csvImportFileValidation() {
    var file = $('#csv_import_file').get(0).files[0];

    if (typeof file !== "undefined" && file !== null) {
        var f_extension = getFileExtension(file.name);
        if (f_extension !== "csv") {
            swal({title: "Error", text: "Only CSV file can be import", type: "error"});
            return false;
        } 
        else {   
            if (file.size >= 2000000) {
                swal({title: "Error", text: "Attached file size is too big, max. file size allow is 2Mb or less", type: "error"});
                return false;
            }
            else {
                return true;
            }
        }
    }
    else {
        swal({title: "Error", text: "Please select file", type: "error"});
        return false;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function insertCSVImportFileAttachment() {
    var file = $('#csv_import_file').get(0).files[0];  
    var file_data = new FormData();
    var f_name = removeIllegalCharacters(file.name);
    f_name = getDTUIStamp() + "_" + f_name.replace(".csv", "") + "_" + sessionStorage.getItem('ss_ipbc_loginName').replace(" ", "_") + ".csv";
    file_data.append("files[]", file, f_name); 

    if (!upload_csvImportFile(file_data)) {
        var str_msg = "DB system error INSERT CANVAS FROM CSV FILE ";
        return dbSystemErrorHandling(str_msg);
    }
    return true;
}