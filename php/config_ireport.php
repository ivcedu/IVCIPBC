<?php
    $dbHost = "IEXDBLISTNR";
    $dbDatabase = "IREPORT";
    $dbUser = "ireport";
    $dbPass = "~7QM#pd?X*";

    // MSSQL database connection
    try {
        $dbConn = new PDO("sqlsrv:server=$dbHost;Database=$dbDatabase;Encrypt=true;TrustServerCertificate=true", $dbUser, $dbPass);
    } 
    catch (PDOException $e) {
        die ($e->getMessage());
    }