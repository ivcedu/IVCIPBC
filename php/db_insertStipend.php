<?php
    require("config.php");
    
    $StipendOptionID = filter_input(INPUT_POST, 'StipendOptionID');
    $UserID = filter_input(INPUT_POST, 'UserID');
    $Instructor = filter_input(INPUT_POST, 'Instructor');
    $Comments = filter_input(INPUT_POST, 'Comments');
    
    $Comments = str_replace("'", "''", $Comments);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[Stipend] (StipendOptionID, UserID, Instructor, Comments) "
                ."VALUES ('$StipendOptionID', '$UserID', '$Instructor', '$Comments')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);