// ✅ Load Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// ✅ Replace with your Firebase config (same as `announcement.html`)
const firebaseConfig = {
    apiKey: "AIzaSyAIxakRGIrE4BGYbBx3Ed5MKwO9Qf2fegM",
    authDomain: "festx-74486.firebaseapp.com",
    projectId: "festx-74486",
    storageBucket: "festx-74486.appspot.com",
    messagingSenderId: "123462603681",
    appId: "1:123462603681:web:58479c6ea27857818eb1e0",
    measurementId: "G-VXB4BDNQMC"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Fetch Announcements in Real-Time
const notificationDropdown = document.querySelector(".notification-dropdown");

function loadNotifications() {
    const announcementsRef = collection(db, "announcements");
    const q = query(announcementsRef, orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) => {
        notificationDropdown.innerHTML = ""; // Clear previous notifications
        if (snapshot.empty) {
            notificationDropdown.innerHTML = "<p>No new notifications.</p>";
            return;
        }

        snapshot.forEach((doc) => {
            let data = doc.data();
            let item = document.createElement("div");
            item.classList.add("notification-item");
            item.innerHTML = `<strong>${data.title}</strong>: ${data.message}`;
            notificationDropdown.appendChild(item);
        });
    }, (error) => {
        console.error("❌ Error fetching notifications:", error);
        notificationDropdown.innerHTML = "<p>❌ Error loading notifications.</p>";
    });
}

// ✅ Call Function to Load Notifications
loadNotifications();
