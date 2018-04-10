<?php
    require("config.php");

    $query = "SELECT tdci.FirstName + ' ' + tdci.LastName, "
            . "stpd.Instructor, "
            . "stio.StipendOption, "
            . "CONVERT(VARCHAR(10), sptk.DateToHR, 101), "
            . "CONVERT(VARCHAR(10), sptk.DateBA, 101), "
            . "CONVERT(VARCHAR(10), sptk.DateToPayroll, 101) "
            . "FROM [".$dbDatabase."].[dbo].[Stipend] AS stpd LEFT JOIN [".$dbDatabase."].[dbo].[StipendTracking] AS sptk ON stpd.StipendID = sptk.StipendID "
            . "LEFT JOIN [".$dbDatabase."].[dbo].[StipendOption] AS stio ON stpd.StipendOptionID = stio.StipendOptionID "
            . "LEFT JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[InstructorInfo] AS tdci ON stpd.Instructor = tdci.UserID";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);