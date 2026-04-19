<?php
session_start();
// Security Check: If the user is not logged in, redirect them to the login page.
if (!isset($_SESSION['logged_in_user'])) {
    header("Location: login.html");
    exit();
}
require 'db_connect.php';

// Handle new message submission when the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['message'])) {
    $message = mysqli_real_escape_string($conn, $_POST['message']);
    $username = $_SESSION['logged_in_user'];
    
    $sql = "INSERT INTO messages (username, message) VALUES ('$username', '$message')";
    mysqli_query($conn, $sql);
    // Redirect to the same page to prevent form resubmission on refresh
    header("Location: forum.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Discussion Forum | WarWatch</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .chat-container { border: 1px solid #ccc; height: 400px; overflow-y: auto; padding: 15px; background: #f9f9f9; margin-bottom: 20px; }
        .chat-message { font-style: 'color: blue;'; margin-bottom: 15px; border-bottom: 1px dotted #ddd; padding-bottom: 10px; }
        .chat-message .user { font-weight: bold; color: #152e4d; }
        .chat-message .time { font-size: 11px; color: #777; margin-left: 10px; }
        .chat-message .text { margin-top: 5px; }
    </style>
</head>
<body>
    <div class="page-wrapper">
        <header class="sticky-header">
            <div class="logo-area">
                <a href="index.html" style="text-decoration: none; display: inline-block;">
                <h1>WAR<span class="logo-red">WATCH</span></h1>
                </a>
            </div>
            <!-- Inside forum.php header -->
<nav class="main-nav">
    <a href="index.html">Dashboard</a>
    <a href="news.html">News Headlines</a>
    <a href="map.html">Impact Map</a>
    <a href="forum.php" class="active">Public Forum</a>
    <a href="about.html">About Us</a>
    <!-- Show Logout if logged in -->
    <a href="logout.php" class="nav-right" style="background-color: #8b0000;">Log Out</a>
</nav>
        </header>

        <main class="content-area">
    <h2 class="section-title">Global Personnel Forum</h2>

    <div class="chat-app-container">
        
        <!-- Left Sidebar (From Image 1) -->
        <aside class="chat-sidebar">
            <div class="sidebar-header">
                <h3>Active Personnel</h3>
            </div>
            <ul class="user-list">
                <!-- Hardcoded examples to show the UI layout -->
                <li><img src="https://ui-avatars.com/api/?name=Admin&background=8b0000&color=fff" class="user-avatar-small"> Commander</li>
                <li><img src="https://ui-avatars.com/api/?name=Aditya&background=3b6ca8&color=fff" class="user-avatar-small"> Aditya</li>
                <li><img src="https://ui-avatars.com/api/?name=Analyst&background=152e4d&color=fff" class="user-avatar-small"> Intel Analyst</li>
            </ul>
            <div class="sidebar-footer">
                &#128274; Secure Encrypted Connection
            </div>
        </aside>

        <!-- Main Chat Area -->
        <section class="chat-main">
            
            <!-- This is where the messages go -->
            <div class="chat-messages" id="chatWindow">
    
    <?php
    // 1. Connect to your database (Update password if you have one for XAMPP root)
$conn = mysqli_connect("localhost", "root", "", "warwatch_db");

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // 2. Fetch messages from the database (Change 'messages' if your table name is different)
    $query = "SELECT * FROM messages ORDER BY post_time ASC";
    $result = mysqli_query($conn, $query);

    // 3. Loop through the database and generate the HTML for EACH message
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) { 
            // Secure the data
            $username = htmlspecialchars($row['username']);
            $msg = htmlspecialchars($row['message']);
            
            // Format the time nicely (Optional, but looks better)
            $raw_time = strtotime($row['post_time']);
            $time = date("M d, H:i", $raw_time);
            ?>
            
            <!-- THE MESSAGE BUBBLE HTML -->
            <div class="message-item">
                <img class="msg-avatar" src="https://ui-avatars.com/api/?name=<?php echo $username; ?>&background=random&color=fff" alt="Avatar">
                
                <div class="msg-content">
                    <div class="msg-header">
                        <span class="msg-name"><?php echo $username; ?></span>
                        <span class="msg-time"><?php echo $time; ?></span>
                    </div>
                    <div class="msg-bubble">
                        <?php echo $msg; ?>
                    </div>
                </div>
            </div>
            <!-- END MESSAGE BUBBLE -->

            <?php 
        } // End of the while loop
    } else {
        echo "<p style='text-align:center; color:#888; margin-top:20px;'>No messages yet. Be the first to report intel!</p>";
    }
    ?>

</div>
            <!-- The Pill-Shaped Input Area at the bottom -->
            <div class="chat-input-area">
                <form action="forum.php" method="POST" class="chat-form">
                    <input type="text" name="message" placeholder="Type a message..." required autocomplete="off">
                    <button type="submit" class="send-btn">&#10148;</button>
                </form>
            </div>
        </section>

    </div>
</main>

    </div>
<!-- Add this script right before the closing </body> tag in forum.php -->
<script>
    // This simple script ensures the chat window always scrolls to the newest message at the bottom
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
</script>
</body>
</html>