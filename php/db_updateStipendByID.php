<?php
    require("config.php");
    
    $StipendID = filter_input(INPUT_POST, 'StipendID');
    $StipendOptionID = filter_input(INPUT_POST, 'StipendOptionID');
    $UserID = filter_input(INPUT_POST, 'UserID');
    $Instructor = filter_input(INPUT_POST, 'Instructor');
    $Comments = filter_input(INPUT_POST, 'Comments');
    
    $Comments = str_replace("'", "''", $Comments);

    $query = "UPDATE [".$dbDatabase."].[dbo].[Stipend] "
                . "SET StipendOptionID = '".$StipendOptionID."', UserID = '".$UserID."', Instructor = '".$Instructor."', Comments = '".$Comments."', Modified = getdate() "
                . "WHERE StipendID = '".$StipendID."'";
    
    $cmd = $dbConn->prepare($query);
    $result = $cmd->execute(); 

    echo json_encode($result);