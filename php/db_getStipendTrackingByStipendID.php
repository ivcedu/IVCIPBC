<?php
    require("config.php");
    
    $StipendID = filter_input(INPUT_POST, 'StipendID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[StipendTracking] WHERE StipendID = '".$StipendID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);