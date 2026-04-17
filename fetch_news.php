<?php
// Unit 4: PHP External API Integration
// Set header to JSON so JavaScript can read it easily
header('Content-Type: application/json');

// --- PUT YOUR GNEWS API KEY HERE ---
$apiKey = 'c937061035c03ab903528be56f8084a3'; 

// We search for news containing the words: war, military, or conflict. We limit it to 6 articles.
$url = "https://gnews.io/api/v4/search?q=war%20OR%20military%20OR%20conflict&lang=en&max=6&apikey=" . $apiKey;

// Fetch the data from the live internet
$response = @file_get_contents($url);

// Error handling in case the API goes down or you lose internet
if ($response === FALSE) {
    // Send a fallback JSON error message
    echo json_encode([
        "error" => true,
        "message" => "Live feed temporarily disconnected. Unable to fetch satellite news."
    ]);
} else {
    // Send the live news data straight to the frontend
    echo $response;
}
?>