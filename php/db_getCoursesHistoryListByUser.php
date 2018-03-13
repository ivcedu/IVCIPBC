<?php
    require("config.php");
    
    $Instructor = filter_input(INPUT_POST, 'Instructor');

    $query = "SELECT 'Blackboard' AS TableName, bkbd.TermCode, bkbd.SectionNum, bkbd.Instructor, tdci.CourseID, bkbd.Status, bkbd.CoursesType "
            . "FROM [".$dbDatabase."].[dbo].[Blackboard] AS bkbd LEFT JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[CourseInfo] AS tdci ON bkbd.TermCode = tdci.TermCode AND bkbd.SectionNum = tdci.SectionNum "
            . "WHERE bkbd.Instructor = '".$Instructor."' "
            . "UNION ALL "
            . "SELECT 'Canvas' AS TableName, cnvs.TermCode, cnvs.SectionNum, cnvs.Instructor, tdci.CourseID, cnvs.Status, cnvs.CoursesType "
            . "FROM [".$dbDatabase."].[dbo].[Canvas] AS cnvs LEFT JOIN [SKYBLAST.SOCCCD.EDU].[Tardis].[dbo].[CourseInfo] AS tdci ON cnvs.TermCode = tdci.TermCode AND cnvs.SectionNum = tdci.SectionNum "
            . "WHERE cnvs.Instructor = '".$Instructor."'";

    $cmd = $dbConn->prepare($query);
    $cmd->execute(); 
    $data = $cmd->fetchAll();

    echo json_encode($data);