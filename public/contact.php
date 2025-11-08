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

// === reCAPTCHA Enterprise Config ===
$RECAPTCHA_SITE_KEY = '6LfO5_wrAAAAABZZztKHdyxOpMYuJjayfy08yw_t';
$RECAPTCHA_API_KEY  = 'AIzaSyDQrkFXCJAK2Z623a-_Z8UOrEJmWjlB9M4'; // <-- HIER DEINEN API-KEY EINTRAGEN!
$RECAPTCHA_PROJECT_ID = 'welledgecreative-1761883050337';

// 2) Nur POST akzeptieren
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Method not allowed';
  exit;
}

// 3) Eingaben holen & validieren
$name     = trim($_POST['name']  ?? '');
$email    = trim($_POST['email'] ?? '');
$website  = trim($_POST['website'] ?? '');
$segment  = trim($_POST['segment'] ?? '');
$budget   = trim($_POST['budget'] ?? '');
$timeline = trim($_POST['timeline'] ?? '');
$goals    = trim($_POST['goals'] ?? '');
$extra    = trim($_POST['extra'] ?? '');
$captchaToken = $_POST['g-recaptcha-response'] ?? '';

if (!$name || !$email) {
  http_response_code(400);
  echo 'Missing required fields (name, email)';
  exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo 'Invalid email';
  exit;
}
if (!$captchaToken) {
  http_response_code(400);
  echo 'No reCAPTCHA token found';
  exit;
}

// 4) reCAPTCHA Enterprise prüfen
$data = [
  'event' => [
    'token'          => $captchaToken,
    'expectedAction' => 'submit',
    'siteKey'        => $RECAPTCHA_SITE_KEY
  ]
];

$url = "https://recaptchaenterprise.googleapis.com/v1/projects/$RECAPTCHA_PROJECT_ID/assessments?key=$RECAPTCHA_API_KEY";
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
$response = curl_exec($ch);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Optional: Debug-Log erstellen (auskommentieren für Produktion)
// file_put_contents(__DIR__ . '/captcha_log.txt', $response . "\n\n", FILE_APPEND);

$result = json_decode($response, true);

if ($status !== 200 || empty($result['tokenProperties']['valid']) || $result['tokenProperties']['valid'] !== true) {
  error_log('reCAPTCHA Enterprise failed: ' . $response);
  http_response_code(400);
  echo 'Captcha verification failed';
  exit;
}

// Optional: Score-Prüfung
$score = $result['riskAnalysis']['score'] ?? 0;
if ($score < 0.3) {
  error_log("reCAPTCHA Enterprise: Low trust score ($score)");
  http_response_code(400);
  echo "Low trust score: $score";
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
  $mail->addReplyTo($email, $name);

  // Inhalt
  $mail->isHTML(true);
  $mail->Subject = "Neue Kontaktanfrage ({$segment}) — Well Edge Creative";
  $mail->Body    = nl2br(
    "Name: {$name}\n" .
    "Email: {$email}\n" .
    "Website: " . ($website !== '' ? $website : '–') . "\n" .
    "Segment: {$segment}\n" .
    "Budget: " . ($budget !== '' ? $budget : '–') . "\n" .
    "Timeline: " . ($timeline !== '' ? $timeline : '–') . "\n\n" .
    "Goals:\n{$goals}\n\n" .
    ($extra !== '' ? "Additional Notes:\n{$extra}\n" : '')
  );
  $mail->AltBody =
    "Name: {$name}\n" .
    "Email: {$email}\n" .
    "Website: " . ($website !== '' ? $website : '–') . "\n" .
    "Segment: {$segment}\n" .
    "Budget: " . ($budget !== '' ? $budget : '–') . "\n" .
    "Timeline: " . ($timeline !== '' ? $timeline : '–') . "\n\n" .
    "Goals:\n{$goals}\n\n" .
    ($extra !== '' ? "Additional Notes:\n{$extra}\n" : '');

  $mail->send();
  echo 'OK';
} catch (Exception $e) {
  http_response_code(500);
  echo 'Mailer error';
}
