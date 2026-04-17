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
    
    // --- 1. INIT VANTA.JS GLOBAL WAVES (Background) ---
    if (typeof VANTA !== 'undefined' && document.getElementById("vanta-bg-global")) {
        VANTA.WAVES({
            el: "#vanta-bg-global",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x43059,      
            shininess: 35.00,     
            waveHeight: 15.00,
            waveSpeed: 0.75,      
            zoom: 1.00
        });
    }

    // --- 2. INIT VANTA.JS GLOBE (Dashboard Hero Section) ---
    // Check if the specific globe div exists on the current page (e.g., index.html)
    if (typeof VANTA !== 'undefined' && document.getElementById("vanta-bg")) {
        VANTA.GLOBE({
            el: "#vanta-bg",            
            mouseControls: true,        
            touchControls: true,        
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x8b0000,            // ISW Dark Red dots
            color2: 0x152e4d,           // ISW Navy lines
            size: 1.10,                 
            backgroundColor: 0x051324   // Very dark navy background for contrast
        });
    }

    // ... (Keep your toggleWarMenu code here) ...
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
// ==========================================
// LIVE NEWS FEED (AJAX & DOM MANIPULATION)
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    // Check if we are on the news page by looking for the container
    const newsContainer = document.getElementById("live-news-container");
    
    if (newsContainer) {
        fetchLiveNews();
    }
});
function fetchLiveNews() {
    // ---> THIS IS THE MISSING LINE THAT FIXES THE ERROR <---
    const newsContainer = document.getElementById("live-news-container");
    
    // Safety check: if the container isn't on this page, stop running the script
    if (!newsContainer) return; 

    fetch('fetch_news.php')
        .then(response => response.json())
        .then(data => {
            // Clear the "Downloading..." message
            newsContainer.innerHTML = "";

            if (data.error) {
                newsContainer.innerHTML = `<div class="report-box"><p style="color:red;">${data.message}</p></div>`;
                return;
            }

            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    let pubDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'
                    });

                    let imageUrl = article.image ? article.image : 'map1.jpg';

                    let articleHTML = `
                        <div class="report-box" style="display: flex; gap: 20px; align-items: flex-start;">
                            <img src="${imageUrl}" alt="News Image" style="width: 200px; height: 120px; object-fit: cover; border: 1px solid #ccc; border-radius: 3px;">
                            <div>
                                <h3 style="color: #0a2240; margin-bottom: 5px; font-family: 'Libre Baskerville', serif;">
                                    <a href="${article.url}" target="_blank" style="color: #0a2240; text-decoration: none;">${article.title}</a>
                                </h3>
                                <p style="font-size: 12px; color: #8b0000; margin-bottom: 10px; font-weight: bold;">
                                    Published: ${pubDate} | Source: ${article.source.name}
                                </p>
                                <p class="about-text" style="font-size: 14px;">
                                    ${article.description} 
                                    <a href="${article.url}" target="_blank" style="color: #8b0000; font-weight: bold;">[Read Full Brief &rarr;]</a>
                                </p>
                            </div>
                        </div>
                    `;
                    newsContainer.innerHTML += articleHTML;
                });
            } else {
                newsContainer.innerHTML = `<div class="report-box"><p>No recent operational updates found.</p></div>`;
            }
        })
 .catch(error => {
            console.error("AJAX Error:", error);
            newsContainer.innerHTML = `<div class="report-box"><p style="color:red;">Connection lost. Check console for details.</p></div>`;
        });
}
/* =========================================
   WAR OVERVIEW PAGE INTERACTIVITY
   ========================================= */

// Smooth scrolling for sidebar links
document.querySelectorAll('.sticky-sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Modal Image Gallery
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

function openModal(imgElement) {
    if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = imgElement.src;
        captionText.innerHTML = imgElement.alt;
    }
}

function closeModal() {
    if (modal) {
        modal.style.display = "none";
    }
}