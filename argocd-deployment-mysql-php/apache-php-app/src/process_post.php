<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $title = $conn->real_escape_string($_POST['title']);
    $company = $conn->real_escape_string($_POST['company']);
    $location = $conn->real_escape_string($_POST['location']);
    $description = $conn->real_escape_string($_POST['description']);
    $salary = $conn->real_escape_string($_POST['salary']);
    $email = $conn->real_escape_string($_POST['email']);

    $sql = "INSERT INTO jobs (title, company, location, description, salary, email) VALUES ('$title', '$company', '$location', '$description', '$salary', '$email')";

    if ($conn->query($sql) === TRUE) {
        echo "New job posted successfully! Redirecting to job listings...";
        header("Refresh: 3; url=index.php"); // Redirect after 3 seconds
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
?>