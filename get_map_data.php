<?php
// Unit 4: Database Connection and Data Retrieval
// Turn off error reporting to prevent PHP warnings from breaking the JSON format.
error_reporting(0); 

// Include the database connection file
require 'db_connect.php';

// SQL query to fetch all conflict data
$query = "SELECT * FROM map_markers";
$result = mysqli_query($conn, $query);

// Create an empty PHP array to store our data
$markers = array();

// Check if the query was successful and returned any rows
if ($result && mysqli_num_rows($result) > 0) {
    // Loop through each row of the result set
    while($row = mysqli_fetch_assoc($result)) {
        // Add the current row (which is an associative array) to our main markers array
        $markers[] = $row;
    }
}

// Set the HTTP header to tell the browser that the response is JSON
header('Content-Type: application/json');

// Convert the PHP array into a JSON string and send it back to the JavaScript
echo json_encode($markers);
?>