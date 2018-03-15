<?php
    require("config.php");
    
    $StipendID = filter_input(INPUT_POST, 'StipendID');
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[StipendTracking] (StipendID) "
                ."VALUES ('$StipendID')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);