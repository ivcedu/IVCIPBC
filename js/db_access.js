// get AD login info ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginUserInfo(php_file, user, pass) {
    var result = new Array();
    $.ajax({
        type:"POST",
        datatype:"json",
        url:php_file,
        data:{username:user, password:pass},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// tardis get DB ///////////////////////////////////////////////////////////////
function tardis_getInstructorByUserID(UserID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/tardis_getInstructorByUserID.php",
        data:{UserID:UserID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function tardis_getInstructorList() {
//    var result = new Array();
    var result;
    $.ajax({
        type:"POST",
        url:"php/tardis_getInstructorList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// get DB //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_getUserAccessListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getUserAccessListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getUserByID(UserID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getUserByID.php",
        data:{UserID:UserID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getUserByEmail(UserEmail) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getUserByEmail.php",
        data:{UserEmail:UserEmail},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getUserListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getUserListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendOptionListActive() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendOptionListActive.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendOptionListDataTable() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendOptionListDataTable.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendOptionByID(StipendOptionID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendOptionByID.php",
        data:{StipendOptionID:StipendOptionID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getCoursesHistoryListByUser(Instructor) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getCoursesHistoryListByUser.php",
        data:{Instructor:Instructor},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendByInstructor(Instructor) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendByInstructor.php",
        data:{Instructor:Instructor},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendLogByStipendID(StipendID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendLogByStipendID.php",
        data:{StipendID:StipendID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendTrackingByStipendID(StipendID) {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendTrackingByStipendID.php",
        data:{StipendID:StipendID},
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

function db_getStipendTrackingList() {
    var result = new Array();
    $.ajax({
        type:"POST",
        url:"php/db_getStipendTrackingList.php",
        async: false,  
        success:function(data) {
            result = JSON.parse(data);
        }
    });
    return result;
}

// insert DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_insertSystemLog(UserName, Note) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertSystemLog.php",
        data:{UserName:UserName, Note:Note},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertUser(Active, UserAccessID, UserName, UserEmail) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertUser.php",
        data:{Active:Active, UserAccessID:UserAccessID, UserName:UserName, UserEmail:UserEmail},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStipendOption(Active, StipendOption) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStipendOption.php",
        data:{Active:Active, StipendOption:StipendOption},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStipend(StipendOptionID, UserID, Instructor, Comments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStipend.php",
        data:{StipendOptionID:StipendOptionID, UserID:UserID, Instructor:Instructor, Comments:Comments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStipendLog(StipendID, UserID, Comments) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStipendLog.php",
        data:{StipendID:StipendID, UserID:UserID, Comments:Comments},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

function db_insertStipendTracking(StipendID) {
    var ResultID = "";
    $.ajax({
        type:"POST",
        url:"php/db_insertStipendTracking.php",
        data:{StipendID:StipendID},
        async: false,  
        success:function(data) {
            ResultID = JSON.parse(data);
        }
    });
    return ResultID;
}

// update DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_updateUserByID(UserID, Active, UserAccessID, UserName, UserEmail) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateUserByID.php",
        data:{UserID:UserID, Active:Active, UserAccessID:UserAccessID, UserName:UserName, UserEmail:UserEmail},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStipendOptionByID(StipendOptionID, Active, StipendOption) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStipendOptionByID.php",
        data:{StipendOptionID:StipendOptionID, Active:Active, StipendOption:StipendOption},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateStipendByID(StipendID, StipendOptionID, UserID, Instructor, Comments) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateStipendByID.php",
        data:{StipendID:StipendID, StipendOptionID:StipendOptionID, UserID:UserID, Instructor:Instructor, Comments:Comments},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSTSignedByFiscalByID(StipendTrackingID, SignedByFiscal) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSTSignedByFiscalByID.php",
        data:{StipendTrackingID:StipendTrackingID, SignedByFiscal:SignedByFiscal},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSTDateToHRByID(StipendTrackingID, DateToHR) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSTDateToHRByID.php",
        data:{StipendTrackingID:StipendTrackingID, DateToHR:DateToHR},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSTDateBAByID(StipendTrackingID, DateBA) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSTDateBAByID.php",
        data:{StipendTrackingID:StipendTrackingID, DateBA:DateBA},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function db_updateSTDateToPayrollByID(StipendTrackingID, DateToPayroll) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_updateSTDateToPayrollByID.php",
        data:{StipendTrackingID:StipendTrackingID, DateToPayroll:DateToPayroll},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

// delete DB ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function db_deleteCanvasByTermCode(TermCode) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/db_deleteCanvasByTermCode.php",
        data:{TermCode:TermCode},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ireportDBgetUserAccess(Username) {   
    var Result = "";
    $.ajax({
        type:"POST",
        url:"php/ireport_db_getUserAccess.php",
        data:{Username:Username},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function upload_csvImportFile(file_data) {
    var Result = false;
    $.ajax({  
        type: "POST",
        url: "php/upload_csvImportFile.php",  
        data: file_data,
        processData: false,  
        contentType: false,  
        async: false,
        success:function(data) {
            Result = JSON.parse(data);
        }  
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function removeFileMrktAttachment(FileLinkName) {
//    var Result = false;
//    $.ajax({ 
//        type: "POST",
//        url: "php/remove_FileMrktAttachment.php",
//        data:{FileLinkName:FileLinkName}, 
//        async: false,
//        success:function(data) {
//            Result = JSON.parse(data);
//        }  
//    });
//    return Result;
//}