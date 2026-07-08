document.addEventListener("DOMContentLoaded", () => {
    const DOM = {
        header: document.querySelector(".header"),
        nav: document.querySelector(".nav"),
        navToggle: document.querySelector(".nav-toggle"),
        navLinks: document.querySelectorAll(".nav-link"),
        sections: document.querySelectorAll("section[id]"),
        backToTop: document.querySelector(".back-to-top")
    };

    if (DOM.header) {
        const updateHeader = () => DOM.header.classList.toggle("scrolled", window.scrollY > 80);
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    if (DOM.navToggle && DOM.nav) {
        DOM.navToggle.addEventListener("click", () => {
            const isOpen = DOM.nav.classList.toggle("active");
            DOM.navToggle.classList.toggle("active", isOpen);
            DOM.navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    DOM.navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            DOM.nav?.classList.remove("active");
            DOM.navToggle?.classList.remove("active");
            DOM.navToggle?.setAttribute("aria-expanded", "false");
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (DOM.backToTop) {
        window.addEventListener("scroll", () => {
            DOM.backToTop.classList.toggle("show", window.scrollY > 600);
        }, { passive: true });

        DOM.backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    if ("IntersectionObserver" in window && DOM.sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                DOM.navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

        DOM.sections.forEach((section) => observer.observe(section));
    }
});
