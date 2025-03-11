document.addEventListener('DOMContentLoaded', () => {
    console.log("📌 Dashboard Loaded!");

    // Simulated User Events (replace with Firestore data if needed)
    const user = {
        events: [
            { title: "Coding Competition", date: "March 15, 2025", time: "10:00 AM" },
            { title: "Dance Battle", date: "March 16, 2025", time: "2:00 PM" }
        ]
    };

    // Populate Events
    const eventsList = document.getElementById("eventsList");
    user.events.forEach(event => {
        let eventHTML = `
            <div class="event-item">
                <div>
                    <h3>${event.title}</h3>
                    <p>${event.date} | ${event.time}</p>
                </div>
                <button class="btn btn-primary neon-glow event-details-btn">Details</button>
            </div>
        `;
        eventsList.innerHTML += eventHTML;
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});