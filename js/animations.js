/*==================================================
            LUMIQ STUDIO
            ANIMATIONS
==================================================*/

/*======================================
        SCROLL REVEAL
======================================*/

const animatedElements = document.querySelectorAll(

    ".fade-up, .fade-left, .fade-right, .zoom, .rotate"

);

const observerOptions = {

    root: null,

    rootMargin: "0px",

    threshold: 0.15

};

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        });

    },

    observerOptions

);

animatedElements.forEach((element) => {

    revealObserver.observe(element);

});

/*======================================
        COUNTER
======================================*/

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.count);

            let current = 0;

            const increment = Math.max(1, Math.ceil(target / 80));

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent = target;

                    return;

                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    },

    {

        threshold: 0.4

    }

);

counters.forEach((counter) => {

    counterObserver.observe(counter);

});

/*======================================
        CARD TILT
======================================*/

const cards = document.querySelectorAll(

    ".card, .service-card, .project-card"

);

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;

        const y = event.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        const rotateX = ((y / rect.height) - 0.5) * -10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

