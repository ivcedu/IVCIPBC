<?php
    require("config.php");
    
    $StipendTrackingID = filter_input(INPUT_POST, 'StipendTrackingID');
    $DateToHR = filter_input(INPUT_POST, 'DateToHR');

    $query = "UPDATE [".$dbDatabase."].[dbo].[StipendTracking] "
                . "SET DateToHR = '".$DateToHR."', Modified = getdate() "
                . "WHERE StipendTrackingID = '".$StipendTrackingID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);