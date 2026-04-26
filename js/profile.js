/**
 * TURBODRIVE - PROFILE & SESSION ENGINE
 */

function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg; 
    t.className = "show";
    setTimeout(() => { t.className = ""; }, 3000);
}

function logout() {
    showToast("Logging out securely...");
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1200);
}

// Pulls cars from storage and renders them
function loadGarage() {
    const garageGrid = document.getElementById('garageGrid');
    if (!garageGrid) return;

    let garage = JSON.parse(localStorage.getItem('turboGarage')) || [];

    // If garage is empty, show a message
    if (garage.length === 0) {
        garageGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; color: white; padding: 40px;">
                <h3 style="font-size: 1.5rem; margin-bottom: 15px;">Your garage is currently empty.</h3>
                <p>Visit the showroom to acquire your first vehicle.</p>
                <button class="inquire-btn" style="max-width: 200px; margin: 20px auto 0;" onclick="window.location.href='home.html'">BROWSE SHOWROOM</button>
            </div>
        `;
        return;
    }

    // Map through the saved cars and build the HTML
    garageGrid.innerHTML = garage.map((c, index) => `
        <div class="car-card">
            <img src="${c.img}" alt="${c.name}">
            <h3>${c.name}</h3>
            <p style="color:#fc00ff; font-weight:bold; font-size: 1.1rem;">${c.status}</p>
            <button class="inquire-btn" style="background: transparent; border: 2px solid #333; color: #333; box-shadow: none;" onclick="removeCar(${index})">CANCEL INQUIRY</button>
        </div>
    `).join('');
}

// Remove a specific car from the array and refresh the grid
function removeCar(index) {
    let garage = JSON.parse(localStorage.getItem('turboGarage')) || [];
    garage.splice(index, 1); // Remove 1 item at the specific index
    localStorage.setItem('turboGarage', JSON.stringify(garage)); // Save updated array
    showToast("Vehicle removed from Garage.");
    loadGarage(); // Re-render the grid
}

// Run the load function when the profile page opens
window.onload = () => {
    loadGarage();
};
