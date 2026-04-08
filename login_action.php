<?php
// Unit 4: Handling Sessions and Reading Data from Web Form
session_start();
require 'db_connect.php'; // Include our database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        // Login successful
        $_SESSION['logged_in_user'] = $username;
        header("Location: forum.php"); // Redirect to the secure forum page
        exit();
    } else {
        // Login failed
        echo "<script>
                alert('Invalid username or password. Please try again.');
                window.location.href = 'login.html';
              </script>";
    }
}
?>