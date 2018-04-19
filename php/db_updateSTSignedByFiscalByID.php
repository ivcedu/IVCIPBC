<?php
    require("config.php");
    
    $StipendTrackingID = filter_input(INPUT_POST, 'StipendTrackingID');
    $SignedByFiscal = filter_input(INPUT_POST, 'SignedByFiscal');

    $query = "UPDATE [".$dbDatabase."].[dbo].[StipendTracking] "
                . "SET SignedByFiscal = '".$SignedByFiscal."', Modified = getdate() "
                . "WHERE StipendTrackingID = '".$StipendTrackingID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);