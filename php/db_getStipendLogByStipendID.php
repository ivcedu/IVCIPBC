<?php
    require("config.php");
    
    $StipendID = filter_input(INPUT_POST, 'StipendID');

    $query = "SELECT splg.DTStamp, usrs.UserName, splg.Comments "
            . "FROM [".$dbDatabase."].[dbo].[StipendLog] AS splg LEFT JOIN [".$dbDatabase."].[dbo].[User] AS usrs ON splg.UserID = usrs.UserID "
            . "WHERE splg.StipendID = '".$StipendID."' ORDER BY splg.StipendLogID DESC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);