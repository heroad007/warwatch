<?php
// Unit 4: Handling Sessions
session_start();
session_unset();
session_destroy();

// This script clears the LocalStorage (Browser Memory) 
// before redirecting, so the "Aditya (Logout)" text disappears.
echo "<script>
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
      </script>";
exit();
?>