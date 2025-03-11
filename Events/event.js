function filterEvents() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const eventCards = document.querySelectorAll('.event-card');
  
    eventCards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      card.style.display = title.includes(searchInput) ? 'block' : 'none';
    });
  }
  
  function openModal(modalId) {
    const modal = document.getElementById(modalId); // Corrected 'modaId' to 'modalId'
    modal.classList.add('active'); // Show the modal
  }
  
  // Function to close the modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId); // Corrected 'modalId' spelling
    modal.classList.remove('active'); // Hide the modal
  }
 
  function startCountdown(eventDate, timerId) {
    function updateCountdown() {
        const now = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        const timeLeft = eventTime - now;

        if (timeLeft <= 0) {
            document.getElementById(timerId).innerHTML = "🎉 Event has started!";
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById(timerId).innerHTML = 
            `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateCountdown(); // Initial call
    let countdownInterval = setInterval(updateCountdown, 1000);
}

// Start countdown for INVICTUS (March 10, 2025)
document.addEventListener("DOMContentLoaded", function () {
    startCountdown("2025-03-10 08:00:00", "timer");
});