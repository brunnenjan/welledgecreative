<?php
// contact.php

// 1) Konfiguration
$SMTP_HOST = 'smtp.strato.de';
$SMTP_PORT = 587; // oder 465
$SMTP_SECURE = 'tls'; // bei Port 465: 'ssl'
$SMTP_USER = 'noreply@well-edge-creative.com';
$SMTP_PASS = 'FiuPP_3#MJ*xYwX';
$EMAIL_FROM = 'noreply@well-edge-creative.com';
$EMAIL_TO   = 'jan@well-edge-creative.de'; // wohin gesendet werden soll

$RECAPTCHA_SECRET = '6LfO5_wrAAAAAC-_Pr63CNu_qNIyoukh1kXr6IOW';

// 2) Nur POST akzeptieren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Method not allowed';
  exit;
}

// 3) Eingaben holen & validieren
$name  = trim($_POST['name']  ?? '');
$email = trim($_POST['email'] ?? '');
$msg   = trim($_POST['message'] ?? '');
$captchaToken = $_POST['g-recaptcha-response'] ?? '';

if (!$name || !$email || !$msg) {
  http_response_code(400);
  echo 'Missing fields';
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo 'Invalid email';
  exit;
}

// 4) reCAPTCHA prüfen
$verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='
  . urlencode($RECAPTCHA_SECRET) . '&response=' . urlencode($captchaToken));
$ver = json_decode($verify, true);
if (!$ver['success']) {
  http_response_code(400);
  echo 'Captcha failed';
  exit;
}

// 5) PHPMailer laden (einmalig in /vendor oder als einzelne Datei)
// → Schnellweg: nur core PHPMailer-Dateien in /phpmailer/ ablegen
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
  // SMTP
  $mail->isSMTP();
  $mail->Host       = $SMTP_HOST;
  $mail->SMTPAuth   = true;
  $mail->Username   = $SMTP_USER;
  $mail->Password   = $SMTP_PASS;
  $mail->SMTPSecure = $SMTP_SECURE;
  $mail->Port       = $SMTP_PORT;

  // Absender/Empfänger
  $mail->setFrom($EMAIL_FROM, 'Well Edge Website');
  $mail->addAddress($EMAIL_TO);

  // Inhalt
  $mail->isHTML(true);
  $mail->Subject = 'Neue Kontaktanfrage (well-edge-creative.com)';
  $mail->Body    = nl2br(
    "Name: {$name}\nEmail: {$email}\n\nNachricht:\n{$msg}\n"
  );
  $mail->AltBody = "Name: {$name}\nEmail: {$email}\n\nNachricht:\n{$msg}\n";

  $mail->send();
  echo 'OK';
} catch (Exception $e) {
  http_response_code(500);
  echo 'Mailer error';
}
