<?php
$servername = "db"; // Kubernetes service name for MySQL
$username = "root";           // Your MySQL username
$password = "root"; // IMPORTANT: Change this!
$dbname = "job_board";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>