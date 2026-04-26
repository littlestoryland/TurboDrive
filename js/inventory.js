/**
 * TURBODRIVE - MASTER INVENTORY ENGINE (FINAL EXTENSION FIX)
 */

const cars = [
    // --- 1-15: SPORT ---
    { name: "Porsche 911 GT3 RS (White/Black)", price: "$295k", cat: "SPORT", img: "assets/1.jpeg" },
    { name: "Porsche 911 GT3 RS (Stealth Black)", price: "$310k", cat: "SPORT", img: "assets/2.jpeg" },
    { name: "TechArt GTstreet R", price: "$450k", cat: "SPORT", img: "assets/3.jpg" }, 
    { name: "Porsche Carrera GT", price: "$1.5M", cat: "SPORT", img: "assets/4.jpeg" },
    { name: "Mercedes-AMG GT Black Series", price: "$325k", cat: "SPORT", img: "assets/5.jpeg" },
    { name: "Mercedes-AMG ONE", price: "$2.7M", cat: "SPORT", img: "assets/6.jpeg" },
    { name: "Bugatti Chiron", price: "$3.3M", cat: "SPORT", img: "assets/7.jpeg" },
    { name: "Koenigsegg Agera RS", price: "$2.5M", cat: "SPORT", img: "assets/8.jpeg" },
    { name: "Koenigsegg Jesko Absolut", price: "$3.0M", cat: "SPORT", img: "assets/9.jpg" }, 
    { name: "Ferrari LaFerrari", price: "$3.5M", cat: "SPORT", img: "assets/10.jpeg" },
    { name: "Ferrari SF90 Stradale", price: "$511k", cat: "SPORT", img: "assets/11.jpeg" },
    { name: "Lamborghini Aventador SVJ 63", price: "$900k", cat: "SPORT", img: "assets/12.jpeg" },
    { name: "Lamborghini Revuelto", price: "$608k", cat: "SPORT", img: "assets/13.jpg" }, 
    { name: "McLaren P1 GTR", price: "$3.1M", cat: "SPORT", img: "assets/14.jpeg" },
    { name: "Chevrolet Corvette C8 Z06", price: "$145k", cat: "SPORT", img: "assets/15.jpeg" },

    // --- 16-25: SUV ---
    { name: "Mercedes-AMG G 63 (Copper Spec)", price: "$200k", cat: "SUV", img: "assets/16.jpeg" },
    { name: "Brabus 800 G-Wagon Widestar", price: "$550k", cat: "SUV", img: "assets/17.jpg" }, 
    { name: "Rolls-Royce Dawn (Bespoke Gold)", price: "$850k", cat: "SUV", img: "assets/18.jpeg" },
    { name: "Porsche Cayenne Turbo (Bronze)", price: "$185k", cat: "SUV", img: "assets/19.jpeg" },
    { name: "Porsche Macan S (Champagne Spec)", price: "$95k", cat: "SUV", img: "assets/20.jpeg" },
    
    // Updated extensions based on your file manager screenshot
    { name: "Lamborghini Urus Performante", price: "$270k", cat: "SUV", img: "assets/21.jpg" },
    { name: "Rolls-Royce Cullinan (Black/Gold)", price: "$480k", cat: "SUV", img: "assets/22.webp" }, 
    { name: "Ferrari Purosangue", price: "$400k", cat: "SUV", img: "assets/23.jpg" },
    { name: "Aston Martin DBX707", price: "$240k", cat: "SUV", img: "assets/24.jpeg" },
    { name: "Land Rover Range Rover SV", price: "$220k", cat: "SUV", img: "assets/25.jpeg" },

    // --- 26-30: ELECTRIC ---
    { name: "Rimac Nevera", price: "$2.2M", cat: "ELECTRIC", img: "assets/26.jpeg" },
    { name: "Pininfarina Battista", price: "$2.2M", cat: "ELECTRIC", img: "assets/27.jpeg" },
    { name: "Dodge Charger Daytona SRT EV", price: "$90k", cat: "ELECTRIC", img: "assets/28.jpeg" },
    { name: "Tesla Roadster Concept", price: "$250k", cat: "ELECTRIC", img: "assets/29.webp" }, 
    { name: "Lucid Air Sapphire", price: "$250k", cat: "ELECTRIC", img: "assets/30.jpeg" }
];

// --- CORE UTILITY FUNCTIONS ---

// Toast Notification
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.innerText = msg; 
    t.className = "show";
    setTimeout(() => { t.className = ""; }, 3000);
}

// Save car to Profile Garage
function inquireCar(name, img, price) {
    let garage = JSON.parse(localStorage.getItem('turboGarage')) || [];
    const alreadyExists = garage.find(car => car.name === name);
    
    if (alreadyExists) {
        showToast(name + " is already in your VIP Garage!");
    } else {
        garage.push({ name: name, img: img, price: price, status: "INQUIRY PENDING" });
        localStorage.setItem('turboGarage', JSON.stringify(garage));
        showToast("Success! " + name + " sent to VIP Garage.");
    }
}

// Render the grid based on category
function filterCars(cat, btn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    const grid = document.getElementById('carGrid');
    if(!grid) {
        console.error("TurboDrive Error: Cannot find 'carGrid' in the HTML.");
        return;
    }
    
    const filtered = (cat === 'ALL') ? cars : cars.filter(c => c.cat === cat);
    
    grid.innerHTML = filtered.map(c => `
        <div class="car-card">
            <img src="${c.img}" loading="lazy" alt="${c.name}">
            <h3>${c.name}</h3>
            <p style="color:#fc00ff; font-weight:900; font-size:1.1rem;">${c.price}</p>
            <button class="inquire-btn" onclick="inquireCar('${c.name}', '${c.img}', '${c.price}')">INQUIRE</button>
        </div>
    `).join('');
}

// Ensure cars load instantly when page boots
document.addEventListener('DOMContentLoaded', () => {
    const firstButton = document.querySelector('.cat-btn');
    if (document.getElementById('carGrid')) {
        filterCars('ALL', firstButton);
    }
});
