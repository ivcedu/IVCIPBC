<?php
    require("class.phpmailer.php");

    $Email = filter_input(INPUT_POST, 'Email');
    $CCEmail = filter_input(INPUT_POST, 'CCEmail');
    $Subject = filter_input(INPUT_POST, 'Subject');
    $Message = filter_input(INPUT_POST, 'Message');

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = "smtp1.socccd.edu";
    $mail->From = "donotreply@ivc.edu";
    $mail->FromName = "IVC IT Department";
    
    //Recipients
    $mail->addAddress(trim($Email));
    if (trim($CCEmail) !== "") {
        $mail->addCC(trim($CCEmail));
    }
    
    $mail->IsHTML(true); // send as HTML
    $mail->Subject = $Subject;
    $mail->Body = $Message;

    if($mail->Send()) {
        echo true;
    }
    else {
        echo false;
    }