<?php
    require("class.phpmailer.php");
    
    $Subject = filter_input(INPUT_POST, 'Subject');
    $Message = filter_input(INPUT_POST, 'Message');
    $StrImages = filter_input(INPUT_POST, 'StrImages');
        
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->Host = 'smtp1.socccd.edu';
    $mail->From = "donotreply@ivc.edu";
    $mail->FromName = "IVC IT Department";
    $mail->AddAddress("ivcchat-tech@ivc.edu", "IVC Tech");
//    $mail->AddAddress("ykim160@ivc.edu", "Rich Kim");
    $mail->IsHTML(true); // send as HTML
    $mail->addStringAttachment(base64_decode($StrImages), 'screen_shot.jpg', 'base64', 'image/jpg');
    $mail->Subject = $Subject;
    $mail->Body = $Message;

    if($mail->Send()) {
        echo true;
    }
    else {
        echo false;
    }