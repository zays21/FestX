document.addEventListener('DOMContentLoaded', () => {
    const spinBtn = document.getElementById('spin-btn');
    const wheel = document.getElementById('wheel');
    const countdownDisplay = document.getElementById('countdown-display');
    const countdownText = document.getElementById('countdown-text');
    const festFact = document.getElementById('fest-fact');
    const factText = document.getElementById('fact-text');
    let isSpinning = false;

    // Fest facts array
    const festFacts = [
        "FestX features a live DJ battle on Day 1!",
        "Over 50 clubs will showcase their talents!",
        "Last year’s Hackathon had 200+ participants!",
        "Expect surprise guest performances!",
        "Free swag for the first 100 registrants!"
    ];

    // Countdown logic
    function updateCountdown() {
        const festDate = new Date('March 15, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = festDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        return { days, hours, minutes };
    }

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;

        // Random spin duration and rotation
        const spins = Math.floor(Math.random() * 3) + 3; // 3-5 full spins
        const extraDeg = Math.floor(Math.random() * 360); // Random stopping point
        const totalDeg = spins * 360 + extraDeg;

        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `rotate(${totalDeg}deg)`;

        // Determine which segment lands upright
        const finalDeg = totalDeg % 360;
        const countdown = updateCountdown();
        let resultText;

        if (finalDeg < 120) {
            resultText = `${countdown.days} Days until FestX!`;
        } else if (finalDeg < 240) {
            resultText = `${countdown.hours} Hours to go!`;
        } else {
            resultText = `${countdown.minutes} Minutes left!`;
        }

        setTimeout(() => {
            countdownText.textContent = resultText;
            festFact.style.display = 'block';
            factText.textContent = festFacts[Math.floor(Math.random() * festFacts.length)];
            countdownDisplay.classList.add('fade-in');
            festFact.classList.add('fade-in');
            isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.textContent = 'Spin Again!';
        }, 3000);
    });
});