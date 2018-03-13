<?php
    require("config.php");

    $query = "SELECT usrs.UserName, "
            . "CASE WHEN usrs.Active = 1 THEN 'Yes' ELSE 'No' END AS Active, "
            . "usrs.UserEmail, urac.UserAccess, "
            . "'<a href=# id=''user_id_' + CONVERT(NVARCHAR(255), usrs.UserID) + '''><i class=''iconic iconic-sm iconic-lock-unlocked iconic-color-default'' style=''color: grey;''></i></a>' "
            . "FROM [".$dbDatabase."].[dbo].[User] usrs INNER JOIN [".$dbDatabase."].[dbo].[UserAccess] urac ON usrs.UserAccessID = urac.UserAccessID "
            . "ORDER BY usrs.UserName ASC";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);