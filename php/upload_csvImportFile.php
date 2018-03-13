<?php
    require("config.php");
    $output_dir = "C:/xampp/htdocs/IVCIPBC/temp/";

    if(isset($_FILES["files"])) {
        $file_name = $_FILES["files"]["name"][0];
        $file_name = str_replace("'", "", $file_name);
        $file_name = preg_replace("/[^a-zA-Z0-9 ._]/", "", $file_name);
        $result = move_uploaded_file($_FILES["files"]["tmp_name"][0], $output_dir.$file_name);
        
        if (($handle = fopen($output_dir.$file_name, "r")) !== FALSE) {            
            while (($data = fgetcsv($handle, ",")) !== FALSE) {
                $query = "INSERT INTO [".$dbDatabase."].[dbo].[Canvas] (TermCode, SectionNum, Status, Instructor, CoursesType) "
                            ."VALUES ('$data[0]', '$data[1]', '$data[2]', '$data[3]', '$data[4]')"; 
                
                $cmd = $dbConn->prepare($query);
                $cmd->execute();
                $ResultID = $dbConn->lastInsertId();
            }
            
            fclose($handle);
        }
        
        $result = unlink($output_dir.$file_name);
        echo $result;
        
    }
    else {
        echo false;
    }