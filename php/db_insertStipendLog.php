<?php
    require("config.php");
    
    $StipendID = filter_input(INPUT_POST, 'StipendID');
    $UserID = filter_input(INPUT_POST, 'UserID');
    $Comments = filter_input(INPUT_POST, 'Comments');
    
    $Comments = str_replace("'", "''", $Comments);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[StipendLog] (StipendID, UserID, Comments) "
                ."VALUES ('$StipendID', '$UserID', '$Comments')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);