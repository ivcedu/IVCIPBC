<?php
    require("config.php");

    $query = "SELECT StipendOption, "
            . "CASE WHEN Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "'<a href=# id=''stipend_option_id_' + CONVERT(NVARCHAR(255), StipendOptionID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[StipendOption]";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);