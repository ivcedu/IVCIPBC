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
                                                    columnDefs:[{ className: "dt-center", orderable: false, targets: 0 }], order: [[ 1, "asc" ]],
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
    
    // table row click /////////////////////////////////////////////////////////
    $('table').on( 'draw.dt', function () {
        m_table.columns.adjust();
    });
    
    // table row click /////////////////////////////////////////////////////////
    $('table tbody').on('click', 'a[id^="stipend_id_"]', function(e) {
        e.preventDefault();
        var stipend_id = $(this).attr('id').replace("stipend_id_", ""); 
        var tr = $(this).closest('tr');
        var row = m_table.row( tr );
        
        if ( row.child.isShown() ) {
            $('#stipend_id_' + stipend_id).children().removeClass('iconic-caret-bottom');
            $('#stipend_id_' + stipend_id).children().addClass('iconic-caret-right');
            
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            $('#stipend_id_' + stipend_id).children().removeClass('iconic-caret-right');
            $('#stipend_id_' + stipend_id).children().addClass('iconic-caret-bottom');
            
            row.child( getStipendLog(stipend_id) ).show();
            tr.addClass('shown');
        }

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

////////////////////////////////////////////////////////////////////////////////
function getStipendLog(stipend_id) {
    var result = new Array();
    result = db_getStipendLogByStipendID(stipend_id);
    
    var html = "";
    for (var i = 0; i < result.length; i++) {
        var dt_stamp = convertDBDateTimeToString(result[i]['DTStamp']);
        var login_name = result[i]['UserName'];
        var comments = result[i]['Comments'];
        html += login_name + " : " + dt_stamp + "<br/>" + comments.replace(/\n/g, "<br/>") + "<br/><br/>";
    }
    
    return html;
}