<?php
    require("config.php");
    
    $Instructor = filter_input(INPUT_POST, 'Instructor');

    $query = "SELECT TOP(1) * FROM [".$dbDatabase."].[dbo].[Stipend] WHERE Instructor = '".$Instructor."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);