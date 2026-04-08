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
        .chat-message { margin-bottom: 15px; border-bottom: 1px dotted #ddd; padding-bottom: 10px; }
        .chat-message .user { font-weight: bold; color: #152e4d; }
        .chat-message .time { font-size: 11px; color: #777; margin-left: 10px; }
        .chat-message .text { margin-top: 5px; }
    </style>
</head>
<body>
    <div class="page-wrapper">
        <header class="sticky-header">
            <div class="logo-area"><h1>WarWatch</h1></div>
            <nav class="main-nav">
                <a href="index.html">Dashboard</a>
                <a href="map.html">Impact Map</a>
                <a href="forum.php" class="active">Public Forum</a>
                <a href="logout.php" class="nav-right" style="background-color:#8b0000;">Logout (<?php echo htmlspecialchars($_SESSION['logged_in_user']); ?>)</a>
            </nav>
        </header>

        <main class="content-area">
            <h2 class="section-title">Live Discussion Forum</h2>
            
            <!-- Message Display Area -->
            <div class="chat-container">
                <?php
                    // Fetch all messages from the database
                    $query = "SELECT * FROM messages ORDER BY post_time ASC";
                    $result = mysqli_query($conn, $query);

                    if (mysqli_num_rows($result) > 0) {
                        while($row = mysqli_fetch_assoc($result)) {
                            echo "<div class='chat-message'>";
                            echo "<span class='user'>" . htmlspecialchars($row['username']) . "</span>";
                            echo "<span class='time'>" . $row['post_time'] . "</span>";
                            echo "<div class='text'>" . htmlspecialchars($row['message']) . "</div>";
                            echo "</div>";
                        }
                    } else {
                        echo "<p>No messages yet. Be the first to post!</p>";
                    }
                ?>
            </div>

            <!-- Post New Message Form -->
            <form method="POST" action="forum.php">
                <textarea name="message" style="width: 100%; height: 80px; padding: 10px; border: 1px solid #ccc;" placeholder="Type your message here..." required></textarea>
                <br><br>
                <button type="submit" style="background: #152e4d; color: white; padding: 10px 20px; border: none; cursor: pointer;">Post Message</button>
            </form>
        </main>
    </div>
</body>
</html>