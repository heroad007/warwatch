<?php
// Unit 4: Handling Sessions
session_start();
session_unset();
session_destroy();
header("Location: login.html"); // Redirect back to the login page
exit();
?>