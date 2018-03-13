////////////////////////////////////////////////////////////////////////////////
window.onload = function() {    
    var curBrowser = bowser.name;
    var curVersion = Number(bowser.version);

    switch (curBrowser) {
        case "Safari":
            if (curVersion < 6)
                window.open('browser_not_support.html', '_self');
                return false;
            break;
        case "Chrome":
            if (curVersion < 7)
                window.open('browser_not_support.html', '_self');
                return false;
            break;
        case "Firefox":
            if (curVersion < 22)
                window.open('browser_not_support.html', '_self');
                return false;
            break;
        case "Internet Explorer":
            if (curVersion < 11)
                window.open('browser_not_support.html', '_self');
                return false;
            break;
        default:     
            break;
    }
};

////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {      
    $('#btn_login').click(function() { 
        // ireport.ivc.edu validation //////////////////////////////////////////
        if(location.href.indexOf("ireport.ivc.edu") >= 0 && !ireportValidation()) {
            swal({  title: "Access Denied",
                    text: "This is a Development site. It will redirect to IVC Application site",
                    type: "error",
                    confirmButtonText: "OK" },
                    function() {
                        sessionStorage.clear();
                        window.open('https://services.ivc.edu/', '_self');
                        return false;
                    }
            );
        }
        ////////////////////////////////////////////////////////////////////////
        else {
            var login_error = loginInfo();
            if(login_error === "") {
                if (!isUserHasAccess()) {
                    swal({title: "Access Denied", text: "You don't have access to this site", type: "error"});
                    $('#logn_error').hide();
                    return false;
                }
                window.open('home.html', '_self');
                return false;
            }
            else {
                $('#error_msg').html(login_error);
                $('#logn_error').show();
                this.blur();
                return false;
            }
        }
    });
    
    $.backstretch(["images/ivcipbc_back_web_1.jpg"], { duration: 3000, fade: 750 });
});

////////////////////////////////////////////////////////////////////////////////
function loginInfo() {   
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    var password = $('#password').val();
    
    var result = new Array();
    result = getLoginUserInfo("php/ldap_ivc_login.php", username, password);    
    if (result.length === 0) {
        return "Invalid Username/Email or Password";
    }
    else {
        var name = objToString(result[0]);
        var email = objToString(result[1]);
        var department = objToString(result[2]);
        var phone = objToString(result[3]);
        
        sessionData_login(name, email, department, phone);
        return "";
    }
}

////////////////////////////////////////////////////////////////////////////////
function ireportValidation() {
    var username = $('#username').val().toLowerCase().replace("@ivc.edu", "").replace("@saddleback.edu", "");
    if (ireportDBgetUserAccess(username) !== null) {
        return true;
    }
    else {
        return false;
    }
}