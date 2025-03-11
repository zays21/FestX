// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxJ2s...",
    authDomain: "event-payment-47e68.firebaseapp.com",
    projectId: "event-payment-47e68",
    storageBucket: "event-payment-47e68.firebasestorage.app",
    messagingSenderId: "61082081663",
    appId: "1:61082081663:web:21cf3ffeb6053250db624a",
    measurementId: "G-BYQDL2V45M"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ✅ Load Events from Firestore
const eventSelect = document.getElementById("event");

function loadEvents() {
    db.collection("events").get()
        .then(snapshot => {
            eventSelect.innerHTML = '<option value="" disabled selected>Select Event</option>';
            if (snapshot.empty) {
                eventSelect.innerHTML = '<option value="" disabled>No events available</option>';
                return;
            }
            snapshot.forEach(doc => {
                const eventData = doc.data();
                const option = document.createElement("option");
                option.value = doc.id;
                option.textContent = eventData.name;
                eventSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("❌ Error fetching events:", error);
            eventSelect.innerHTML = '<option value="" disabled>Error loading events</option>';
        });
}
loadEvents();

// ✅ Store event data for invitation
let eventsData = {};
db.collection("events").get().then(snapshot => {
    snapshot.forEach(doc => {
        eventsData[doc.id] = doc.data();
    });
});

// ✅ Generate Invitation File
function generateInvitation(name, email, eventId) {
    const event = eventsData[eventId] || { name: "Unknown Event", date: "TBD", time: "TBD" };
    const verificationCode = `${email}-${eventId}-${Date.now()}`;
    const qrUrl = `http://localhost:5501/verify?code=${verificationCode}`;

    const invitationHTML = `
        <html>
        <body>
            <h2>${event.name} - Invitation</h2>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Date: ${event.date} | Time: ${event.time}</p>
            <img id="qrCode">
            <script>
                const qr = "${qrUrl}";
                document.getElementById("qrCode").src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(qr);
            </script>
        </body>
        </html>
    `;

    const blob = new Blob([invitationHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invitation_${eventId}_${email.split('@')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ✅ Register Button Logic
document.getElementById("registerBtn").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const eventId = document.getElementById("event").value;
    const status = document.getElementById("status");

    if (!name || !email || !eventId) {
        status.textContent = "❌ All fields are required!";
        status.classList.add("error");
        return;
    }

    status.textContent = "✅ Registering...";
    status.classList.add("success");

    // Save registration to Firestore
    db.collection("registrations").add({
        name,
        email,
        eventId,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        status.textContent = "✅ Registration successful! Generating invitation...";
        setTimeout(() => {
            generateInvitation(name, email, eventId);
            status.textContent = "✅ Invitation downloaded!";
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("event").selectedIndex = 0;
        }, 1000);
    }).catch(error => {
        console.error("❌ Error saving registration:", error);
        status.textContent = "❌ Registration failed: " + error.message;
        status.classList.add("error");
    });
});
