<?php
    require("config.php");
    
    $StipendOptionID = filter_input(INPUT_POST, 'StipendOptionID');
    $Active = filter_input(INPUT_POST, 'Active');
    $StipendOption = filter_input(INPUT_POST, 'StipendOption');
    
    $StipendOption = str_replace("'", "''", $StipendOption);

    $query = "UPDATE [".$dbDatabase."].[dbo].[StipendOption] "
                . "SET Active = '".$Active."', StipendOption = '".$StipendOption."', Modified = getdate() "
                . "WHERE StipendOptionID = '".$StipendOptionID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);