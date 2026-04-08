document.addEventListener("DOMContentLoaded", function() {
    
    // By default, open the first war menu so the professor sees how it looks immediately
    const firstMenu = document.getElementById("war1");
    if(firstMenu) {
        firstMenu.style.display = "block";
    }
});

// Function to toggle the display of the war links (DHTML concept)
function toggleWarMenu(warId) {
    const menu = document.getElementById(warId);
    
    // Check current display state and toggle
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}
// Add this new function to the bottom of your script.js file

function updateLiveStatus() {
    // Using the Fetch API, which is the modern way to do AJAX
    fetch('get_status.php')
        .then(response => response.json()) // Parse the JSON from PHP
        .then(data => {
            const statusIndicator = document.getElementById('live-status-indicator');
            statusIndicator.textContent = `[ STATUS: ${data.status} ]`;
            statusIndicator.style.color = data.color;
            statusIndicator.style.fontSize = '14px';
            statusIndicator.style.fontFamily = 'Arial, sans-serif';
        })
        .catch(error => console.error('Error fetching live status:', error));
}

// Call the function once on page load, and then every 5 seconds
document.addEventListener("DOMContentLoaded", function() {
    // ... your existing code ...
    updateLiveStatus(); // Call it immediately
    setInterval(updateLiveStatus, 5000); // Then call it every 5 seconds
});
document.addEventListener("DOMContentLoaded", function() {
    
    // --- INIT VANTA.JS GLOBE ---
    // I have customized the colors to match your ISW Navy/Red theme!
    if (typeof VANTA !== 'undefined') {
        VANTA.GLOBE({
            el: "#vanta-bg",            // Points to the ID in your HTML
            mouseControls: true,        // Allows user to rotate with mouse
            touchControls: true,        // Works on mobile
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8b0000,            // The color of the glowing dots (ISW Dark Red)
            color2: 0x152e4d,           // The connecting lines (ISW Navy)
            size: 1.10,                 // Size of the globe
            backgroundColor: 0x0a1526   // A very deep, dark navy background for the space behind it
        });
    }

    // ... (Keep your existing toggleWarMenu code below this) ...
    const firstMenu = document.getElementById("war1");
    if(firstMenu) {
        firstMenu.style.display = "block";
    }
});

function toggleWarMenu(warId) {
    const menu = document.getElementById(warId);
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}