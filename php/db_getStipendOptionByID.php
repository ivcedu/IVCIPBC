<?php
    require("config.php");
    
    $StipendOptionID = filter_input(INPUT_POST, 'StipendOptionID');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[StipendOption] WHERE StipendOptionID = '".$StipendOptionID."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);