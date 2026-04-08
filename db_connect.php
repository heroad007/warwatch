<?php
// Unit 4: Connecting to a Database (MySQL)
$host = "localhost";
$db_user = "root";      // Default user for XAMPP
$db_pass = "";          // Default password for XAMPP is empty
$db_name = "warwatch_db";

$conn = mysqli_connect($host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>