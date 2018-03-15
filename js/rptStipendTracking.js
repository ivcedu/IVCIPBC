var m_table;
var user_id = "";
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    if (sessionStorage.key(0) !== null) {
        getLoginInfo();
        setAccessLevelMenu();
        getStipendTrackingList();
    }
    else {
        sessionStorage.clear();
        window.open('login.html', '_self');
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {   
    // jquery datatables initialize ////////////////////////////////////////////
    m_table = $('#tbl_stipend_tracking').DataTable({ paging: false, bInfo: false, responsive: true,
                                                    dom: '<"html5buttons"B>lTfgitp',
                                                    buttons: [{ extend: 'copy'}, {extend: 'csv'}, {extend: 'excel', title: 'Stipend_Tracking_List'}, {extend: 'pdf', title: 'Stipend_Tracking_List'},
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
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getLoginInfo() {
    var login_name = sessionStorage.getItem('ss_ipbc_loginName');
    $('#login_user').html(login_name);
}

function setAccessLevelMenu() {
    if (userAccessLevel() !== "4") {
        $('#menu_home').show();
        if (userAccessLevel() === "1") {
            $('#menu_system').show();
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
function getStipendTrackingList() {
    var result = new Array(); 
    result = db_getStipendTrackingList();
    
    setTimeout(function() { 
        m_table.clear();
        m_table.rows.add(result).draw();
    }, 10);
}