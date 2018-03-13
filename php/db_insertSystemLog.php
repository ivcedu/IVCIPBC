<?php
    require("config.php");
    
    $UserName = filter_input(INPUT_POST, 'UserName');
    $Note = filter_input(INPUT_POST, 'Note');
    
    $UserName = str_replace("'", "''", $UserName);
    $Note = str_replace("'", "''", $Note);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[SystemLog] (UserName, Note) "
                ."VALUES ('$UserName', '$Note')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);