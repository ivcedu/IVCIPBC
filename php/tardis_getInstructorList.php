<?php
    require("config.php");
    
    $query = "SELECT UserID "
            . "FROM [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[InstructorInfo] "
            . "GROUP BY UserID "
            . "ORDER BY UserID ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll(PDO::FETCH_COLUMN, 0);

    echo json_encode($data);