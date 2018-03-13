<?php
    require("config.php");
    
    $TermCode = filter_input(INPUT_POST, 'TermCode');
    
    $query = "DELETE [".$dbDatabase."].[dbo].[Canvas] WHERE TermCode = '".$TermCode."'";
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute();           

    echo json_encode($result);