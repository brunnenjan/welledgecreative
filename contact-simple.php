<?php
// Contact Form - Well Edge Creative
// Homepage contact form with project type, budget, and message

// CORS headers - Allow all origins
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Method not allowed';
  exit;
}

// Get form data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$projectType = trim($_POST['projectType'] ?? '');
$budget = trim($_POST['budget'] ?? '');
$message = trim($_POST['message'] ?? '');

// Validate required fields
if (!$name || !$email || !$message) {
  http_response_code(400);
  echo 'Missing required fields';
  exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo 'Invalid email address';
  exit;
}

// === 1) Send email to YOU (admin) ===
$to = 'jan@well-edge-creative.de';
$subject = 'New Contact Form - Well Edge Creative';
$headers = "From: noreply@well-edge-creative.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$body = "New contact form submission:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Project Type: " . ($projectType ? $projectType : 'Not specified') . "\n";
$body .= "Budget Range: " . ($budget ? $budget : 'Not specified') . "\n\n";
$body .= "Message:\n$message\n\n";
$body .= "---\n";
$body .= "Sent from: welledgecreative.vercel.app\n";

$adminSent = mail($to, $subject, $body, $headers);

// === 2) Send confirmation email to CLIENT ===
$clientSubject = 'Thank you for reaching out - Well Edge Creative';
$clientHeaders = "From: Jan Brunnenkant <noreply@well-edge-creative.com>\r\n";
$clientHeaders .= "Reply-To: jan@well-edge-creative.de\r\n";
$clientHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

$clientBody = "Hi $name,\n\n";
$clientBody .= "Thank you for reaching out! I received your message and will get back to you within 24 hours.\n\n";
$clientBody .= "Here's a summary of what you sent:\n\n";
$clientBody .= "Project Type: " . ($projectType ? $projectType : 'Not specified') . "\n";
$clientBody .= "Budget Range: " . ($budget ? $budget : 'Not specified') . "\n\n";
$clientBody .= "Your Message:\n$message\n\n";
$clientBody .= "---\n\n";
$clientBody .= "Looking forward to discussing your project!\n\n";
$clientBody .= "Best regards,\n";
$clientBody .= "Jan Brunnenkant\n";
$clientBody .= "Well Edge Creative\n";
$clientBody .= "https://well-edge-creative.com\n";

$clientSent = mail($email, $clientSubject, $clientBody, $clientHeaders);

// Check if both emails sent successfully
if ($adminSent && $clientSent) {
  http_response_code(200);
  echo 'OK';
} else if ($adminSent) {
  // Admin email sent but client confirmation failed
  http_response_code(200);
  echo 'OK';
} else {
  http_response_code(500);
  echo 'Failed to send email';
}
?>
