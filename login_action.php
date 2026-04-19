<?php
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

        // --- NEW CODE STARTS HERE ---
        // We use JavaScript to save the login state to the browser's local storage
        echo "<script>
                localStorage.setItem('loggedInUser', '" . addslashes($username) . "');
                window.location.href = 'index.html'; 
              </script>";
        // --- NEW CODE ENDS HERE ---
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