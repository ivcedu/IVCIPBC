<?php
    require("config.php");
    
    $StipendTrackingID = filter_input(INPUT_POST, 'StipendTrackingID');
    $DateBA = filter_input(INPUT_POST, 'DateBA');

    $query = "UPDATE [".$dbDatabase."].[dbo].[StipendTracking] "
                . "SET DateBA = '".$DateBA."', Modified = getdate() "
                . "WHERE StipendTrackingID = '".$StipendTrackingID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);