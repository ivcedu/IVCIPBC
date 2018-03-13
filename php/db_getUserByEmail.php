<?php
    require("config.php");
    
    $UserEmail = filter_input(INPUT_POST, 'UserEmail');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[User] WHERE UserEmail = '".$UserEmail."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);