<?php
// Unit 4: Reading data from form and executing SQL INSERT queries
require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    // --- STEP 1: Check if the username already exists ---
    $check_user_sql = "SELECT id FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $check_user_sql);

    if (mysqli_num_rows($result) > 0) {
        // Username is already taken
        echo "<script>
                alert('Error: This username is already taken. Please choose another.');
                window.location.href = 'signup.html';
              </script>";
    } else {
        // --- STEP 2: Username is available, so insert new user into the database ---
        $insert_sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

        if (mysqli_query($conn, $insert_sql)) {
            // Registration successful
            echo "<script>
                    alert('Registration successful! You can now log in.');
                    window.location.href = 'login.html';
                  </script>";
        } else {
            // If something goes wrong with the database query
            echo "<script>
                    alert('Error: Registration failed. Please try again later.');
                    window.location.href = 'signup.html';
                  </script>";
        }
    }
}
?>