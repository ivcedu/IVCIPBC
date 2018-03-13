<?php
    require("config.php");
    
    $Active = filter_input(INPUT_POST, 'Active');
    $StipendOption = filter_input(INPUT_POST, 'StipendOption');
    
    $StipendOption = str_replace("'", "''", $StipendOption);
    
    $query = "INSERT INTO [".$dbDatabase."].[dbo].[StipendOption] (Active, StipendOption) "
                ."VALUES ('$Active', '$StipendOption')";  
    
    $cmd = $dbConn->prepare($query);
    $cmd->execute();
    $ResultID = $dbConn->lastInsertId();

    echo json_encode($ResultID);