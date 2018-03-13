////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function proc_sendEmailToTechSupport(Subject, Message, StrImages) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/sendEmailToTechSupport.php",
        data:{Subject:Subject, Message:Message, StrImages:StrImages},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

function proc_sendEmail(email, cc_email, subject, message) {
    var Result = false;
    $.ajax({
        type:"POST",
        url:"php/sendEmail.php",
        data:{Email:email, CCEmail:cc_email, Subject:subject, Message:message},
        async: false,  
        success:function(data) {
            Result = JSON.parse(data);
        }
    });
    return Result;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function appSystemTechSupport(str_message, str_problems, img_base64) {
    var subject = "From IVC Web Application: Tech Request";
    str_message += "Name: " + sessionStorage.getItem('ss_ipbc_loginName') + "<br/>";
    str_message += "Email: " + sessionStorage.getItem('ss_ipbc_loginEmail') + "<br/><br/>";
    str_message += "Describe Your Technical Support Issue:<br/>" + str_problems.replace(/\n/g, "<br/>");  
    img_base64 = img_base64.replace("data:image/png;base64,", "");
    return proc_sendEmailToTechSupport(subject, str_message, img_base64);
}

function dbSystemErrorHandling(str_msg) {
    sendEmailToDeveloper(str_msg);
    swal({  title: "System Error",
            text: str_msg + ", please contact IVC Tech Support at 949.451.5696",
            type: "error",
            confirmButtonText: "OK" },
            function() {
                sessionStorage.clear();
                window.open('login.html', '_self');
                return false;
            }
    );
}

function sendEmailToDeveloper(str_msg) {
    return proc_sendEmail("ykim160@ivc.edu", "", "IVC Instructor Published Courses: DB System Error", str_msg);
}