<?php
    require("config.php");
    
    $StipendTrackingID = filter_input(INPUT_POST, 'StipendTrackingID');
    $DateToPayroll = filter_input(INPUT_POST, 'DateToPayroll');

    $query = "UPDATE [".$dbDatabase."].[dbo].[StipendTracking] "
                . "SET DateToPayroll = '".$DateToPayroll."', Modified = getdate() "
                . "WHERE StipendTrackingID = '".$StipendTrackingID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);