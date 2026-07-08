document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const heroLaptop = document.querySelector(".hero-laptop");
    const heroGlow = document.querySelector(".hero-glow");
    const floatingCards = document.querySelectorAll(".tech-wrapper");

    if (!hero || !heroLaptop || !heroGlow) return;

    const mouse = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };

    hero.addEventListener("mousemove", (event) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = (event.clientX - rect.left) / rect.width;
        mouse.y = (event.clientY - rect.top) / rect.height;
    });

    hero.addEventListener("mouseleave", () => {
        mouse.x = 0.5;
        mouse.y = 0.5;
    });

    const animateHero = () => {
        current.x += (mouse.x - current.x) * 0.08;
        current.y += (mouse.y - current.y) * 0.08;

        const rotateY = (current.x - 0.5) * 14;
        const rotateX = (current.y - 0.5) * -12;

        heroLaptop.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        heroGlow.style.transform = `translate(${(current.x - 0.5) * 50}px, ${(current.y - 0.5) * 50}px)`;

        floatingCards.forEach((card, index) => {
            const strength = (index + 1) * 8;
            card.style.transform = `translate(${(current.x - 0.5) * strength}px, ${(current.y - 0.5) * strength}px)`;
        });

        requestAnimationFrame(animateHero);
    };

    requestAnimationFrame(animateHero);
});
