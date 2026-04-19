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
    fetch('get_status.php')
        .then(response => response.json())
        .then(data => {
            // --- THIS IS THE FIX ---
            // First, find the element
            const statusIndicator = document.getElementById('live-status-indicator');
            
            // THEN, check if it actually exists before trying to use it
            if (statusIndicator) { 
                statusIndicator.textContent = `[ STATUS: ${data.status} ]`;
                statusIndicator.style.color = data.color;
                statusIndicator.style.fontSize = '14px';
                statusIndicator.style.fontFamily = 'Arial, sans-serif';
            }
        })
        .catch(error => console.error('Error fetching live status:', error));
}

document.addEventListener("DOMContentLoaded", function() {

    // Call the function once on page load, and then every 5 seconds
     updateLiveStatus(); // Call it immediately
    setInterval(updateLiveStatus, 5000); // Then call it every 5 seconds

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
                                <p style="font-size: 12px; color: #ff4800d3; margin-bottom: 10px; font-weight: bold;">
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
// =========================================================
// LIVE STOCK MARKET API INTEGRATION & PREDICTION
// =========================================================

// --- IMPORTANT: PASTE YOUR TWELVE DATA API KEY HERE ---
const API_KEY = "14c6df31166c424c8dff7ac104a30bab"; 

// Data structure with Tickers for API call
// Note: Indian stocks need the exchange symbol (e.g., :NSE for National Stock Exchange)
// =========================================================
// REALISTIC STOCK MARKET SIMULATION (OFFLINE SAFE)
// =========================================================

// Data structure for all 9 stocks (Starting prices)
const stockData = {
    lmt: { base: 445.78, currency: '$', lastPrice: 445.78 },
    xom: { base: 112.30, currency: '$', lastPrice: 112.30 },
    nvda: { base: 905.50, currency: '$', lastPrice: 905.50 },
    shel: { base: 66.80, currency: '$', lastPrice: 66.80 },
    maersk: { base: 7.10, currency: '$', lastPrice: 7.10 },
    spy: { base: 450.15, currency: '$', lastPrice: 450.15 },
    hal: { base: 3850.00, currency: '₹', lastPrice: 3850.00 },
    reliance: { base: 2960.50, currency: '₹', lastPrice: 2960.50 },
    tcs: { base: 4005.80, currency: '₹', lastPrice: 4005.80 }
};

function fetchLiveStockData() {
    // Check if we are on the stock page
    if (!document.getElementById('stock-price-lmt')) return;

    for (const stockId in stockData) {
        const stock = stockData[stockId];
        const priceElement = document.getElementById(`stock-price-${stockId}`);
        if (!priceElement) continue;

        // Generate a realistic random market fluctuation
        const volatility = 0.002; // 0.2% change max per tick
        const fluctuation = (Math.random() - 0.5) * (stock.lastPrice * volatility);
        let newPrice = stock.lastPrice + fluctuation;

        // Prevent it from straying too far from the base price over time
        if (newPrice > stock.base * 1.05) newPrice -= Math.abs(fluctuation) * 2;
        if (newPrice < stock.base * 0.95) newPrice += Math.abs(fluctuation) * 2;

        // Update the HTML on the screen
        priceElement.innerHTML = `${stock.currency}${newPrice.toFixed(2)} <span id="arrow-${stockId}"></span>`;
        
        // Change arrow color based on up/down
        const currentArrow = document.getElementById(`arrow-${stockId}`);
        if (newPrice > stock.lastPrice) {
            currentArrow.innerHTML = "& ▲";
            currentArrow.style.color = "#4CAF50"; // Green
        } else if (newPrice < stock.lastPrice) {
            currentArrow.innerHTML = "& ▼";
            currentArrow.style.color = "#F44336"; // Red
        }
        
        stock.lastPrice = newPrice; // Save for the next tick
    }
}

// Prediction Logic (Tied to the simulated data)
function updatePrediction(stockId) {
    const scenario = document.getElementById(`scenario-${stockId}`).value;
    const resultElement = document.getElementById(`prediction-${stockId}`);
    const stock = stockData[stockId];
    const currentPrice = stock.lastPrice;
    let predictionText = "";
    let futurePrice = 0;

    if (stockId === 'lmt') {
        if (scenario === 'escalation') { futurePrice = currentPrice * 1.15; predictionText = `MODEL: Increased military spending could push value towards ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'ceasefire') { futurePrice = currentPrice * 0.90; predictionText = `MODEL: Reduced demand may see a correction towards ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Current trajectory suggests stable but high demand."; }
    } else if (stockId === 'xom' || stockId === 'shel') {
        if (scenario === 'supply_disruption' || scenario === 'energy_crisis') { futurePrice = currentPrice * 1.25; predictionText = `MODEL: Supply route closure could cause a sharp rise to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'market_open' || scenario === 'green_transition') { futurePrice = currentPrice * 0.95; predictionText = `MODEL: Policy shifts could lead to a dip near ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Price remains highly sensitive to geopolitical tensions."; }
    } else if (stockId === 'nvda') {
         if (scenario === 'ai_arms_race') { futurePrice = currentPrice * 1.20; predictionText = `MODEL: Defense AI demand could drive value to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'export_controls') { futurePrice = currentPrice * 0.85; predictionText = `MODEL: Export bans may trigger a sell-off towards ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Value heavily tied to AI dominance and global tech policy."; }
    } else if (stockId === 'maersk') {
        if (scenario === 'red_sea_closure') { futurePrice = currentPrice * 1.35; predictionText = `MODEL: Route disruptions will spike shipping rates and value to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'trade_boom') { futurePrice = currentPrice * 1.15; predictionText = `MODEL: Trade recovery could boost value to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Profitability is directly linked to global supply chain stability."; }
    } else if (stockId === 'spy') {
        if (scenario === 'recession') { futurePrice = currentPrice * 0.85; predictionText = `MODEL: Economic slowdown could drag the index down to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'stability') { futurePrice = currentPrice * 1.12; predictionText = `MODEL: Sustained peace could fuel a market rally towards ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "The market shows volatility due to ongoing uncertainty."; }
    } else if (stockId === 'hal') {
        if (scenario === 'border_tension') { futurePrice = currentPrice * 1.20; predictionText = `MODEL: Regional tensions would increase defense budgets, targeting ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'export_deal') { futurePrice = currentPrice * 1.30; predictionText = `MODEL: Major export contracts would boost value to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Strong order book supports current high valuation."; }
    } else if (stockId === 'reliance') {
        if (scenario === 'oil_surge') { futurePrice = currentPrice * 1.15; predictionText = `MODEL: Sustained high oil prices would boost profits, targeting ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'global_slowdown') { futurePrice = currentPrice * 0.90; predictionText = `MODEL: Reduced energy demand could pull value down to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Diversified portfolio provides resilience against market shocks."; }
    } else if (stockId === 'tcs') {
        if (scenario === 'budget_cuts') { futurePrice = currentPrice * 0.88; predictionText = `MODEL: Global IT spending cuts impacting value down to ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else if (scenario === 'strong_dollar') { futurePrice = currentPrice * 1.07; predictionText = `MODEL: Favorable currency conversion could target ${stock.currency}${futurePrice.toFixed(2)}.`; }
        else { predictionText = "Performance is closely tied to the health of Western economies."; }
    }
    
    resultElement.textContent = predictionText;
}

// Start simulation when page loads
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('stock-price-lmt')) {
        fetchLiveStockData(); // Load immediately
        setInterval(fetchLiveStockData, 2500); // Ticker updates every 2.5 seconds
    }
});
/* =========================================
   PERSISTENT LOGIN ENGINE (localStorage)
   ========================================= */
document.addEventListener("DOMContentLoaded", function() {
    // 1. Check if a user is stored in the browser
    const user = localStorage.getItem('loggedInUser');
    
    // 2. Find your Login button (the one with class 'nav-right')
    const loginLink = document.querySelector('.nav-right');

  /* Update this specific part in your script.js */
if (user && loginLink) {
    loginLink.textContent = user.toUpperCase() + " (LOGOUT)";
    
    // POINT THIS TO YOUR LOGOUT.PHP
    loginLink.href = "logout.php"; 

    loginLink.addEventListener('click', function(e) {
        // We let the link naturally go to logout.php
        // but we can add a confirmation first
        if (!confirm("Are you sure you want to logout, " + user + "?")) {
            e.preventDefault(); // Stops logout if they click 'Cancel'
        }
    });
}
});