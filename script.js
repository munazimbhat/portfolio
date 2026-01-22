document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAV SCROLL ================= */
  const nav = document.querySelector(".nav");
  const hero = document.querySelector(".hero");

  function onScroll() {
    if (!hero || !nav) return;

    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom <= 0) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll);


  /* ================= GLASS NAME LETTER SWEEP ================= */
  const container = document.getElementById("glassName");
  if (container) {
    const originalText = container.innerText;
    container.innerHTML = "";

    const letters = [];
    [...originalText].forEach(char => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      container.appendChild(span);
      letters.push(span);
    });

    const sweepDuration = 5000;
    const letterDelay = sweepDuration / letters.length;
    const pauseAfter = 2200;

    function runSequence() {
      letters.forEach(l => l.classList.remove("active"));

      letters.forEach((letter, i) => {
        setTimeout(() => {
          letter.classList.add("active");
        }, i * letterDelay);
      });

      setTimeout(() => {
        letters.forEach(l => l.classList.remove("active"));
        setTimeout(runSequence, pauseAfter);
      }, sweepDuration);
    }

    runSequence();
  }


  /* ================= PAGE LOAD + SCROLL ANIMATIONS ================= */

  // Initial staggered animation
  document
    .querySelectorAll(".fade-up, .fade-down, .fade-left, .fade-right")
    .forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate");
      }, index * 120);
    });

  // Replay animation on scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate"); // reset
        }
      });
    },
    { threshold: 0.25 }
  );

  document
    .querySelectorAll(".fade-up, .fade-left, .fade-right, .fade-down")
    .forEach(el => observer.observe(el));

});
