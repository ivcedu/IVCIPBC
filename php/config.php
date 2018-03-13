<?php
    // sql 2016 server 
    $dbHost = "IINTDBLISTNRAG1";
    $dbDatabase = "IVCIPBC";
    $dbUser = "ivcipbc";
    $dbPass = "~7QM#pd?X*";

    // MSSQL database connection
    try {
        $dbConn = new PDO("sqlsrv:server=$dbHost;Database=$dbDatabase;Encrypt=true;TrustServerCertificate=true", $dbUser, $dbPass);
    } 
    catch (PDOException $e) {
        die ($e->getMessage());
    }