/* =========================
   SPLENDID TOAST SYSTEM
   ========================= */

function showToast(title, message = "", type = "success", duration = 3000) {
    let container = document.querySelector(".splendid-toast-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "splendid-toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `splendid-toast ${type}`;

    const icon = type === "error" ? "!" : "✓";

    toast.innerHTML = `
        <div class="splendid-toast-icon">${icon}</div>

        <div class="splendid-toast-content">
            <div class="splendid-toast-title">${title}</div>
            ${message ? `<div class="splendid-toast-message">${message}</div>` : ""}
        </div>

        <button
            class="splendid-toast-close"
            type="button"
            aria-label="Close notification"
        >
            ×
        </button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    const removeToast = () => {
        toast.classList.remove("show");
        toast.classList.add("hide");

        setTimeout(() => {
            toast.remove();

            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    };

    toast
        .querySelector(".splendid-toast-close")
        .addEventListener("click", removeToast);

    setTimeout(removeToast, duration);
}

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = nav.classList.toggle("mobile-open");
        menuBtn.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", isOpen);
    });

    nav.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", () => {
        nav.classList.remove("mobile-open");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("scroll", () => {
        nav.classList.remove("mobile-open");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    }, { passive: true });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("mobile-open");
            menuBtn.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================
   SPLENDID STUDIO PORTFOLIO CAROUSEL
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.querySelector(".portfolio-carousel");

    if (!carousel) return;

    const slides = carousel.querySelectorAll(".portfolio-slide");
    const dotsContainer = carousel.querySelector(".portfolio-dots");

    if (!slides.length || !dotsContainer) return;

    let currentSlide = 0;
    let autoPlay;

    /* Create dots */
    slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "portfolio-dot";

        dot.setAttribute(
            "aria-label",
            `Go to portfolio slide ${index + 1}`
        );

        dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoPlay();
        });

        dotsContainer.appendChild(dot);

    });

    const dots = dotsContainer.querySelectorAll(".portfolio-dot");

    function showSlide(index) {

        currentSlide = index;

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "active",
                slideIndex === currentSlide
            );
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle(
                "active",
                dotIndex === currentSlide
            );
        });

    }

    function nextSlide() {

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);

    }

    function startAutoPlay() {

        autoPlay = setInterval(
            nextSlide,
            5000
        );

    }

    function restartAutoPlay() {

        clearInterval(autoPlay);

        startAutoPlay();

    }

    /* Start from slide 1 */
    showSlide(0);

    /* Automatically change every 5 seconds */
    startAutoPlay();

});

/* =========================================
   CUSTOMER TAB NAVIGATION
   Automatically highlights the current page
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const tabs = document.querySelectorAll(".mobile-tab");

    tabs.forEach((tab) => {

        const link = tab.getAttribute("href");

        if (!link || link === "#") {
            return;
        }

        const tabPage =
            link.split("/").pop().split("#")[0];

        let isActive = tabPage === currentPage;

        /*
         * Order details belongs to the Orders section.
         * Keep Orders active while viewing an individual order.
         */
        if (
            (
                currentPage === "order-details.html" ||
                currentPage === "order.html" ||
                currentPage === "review-order.html"
            ) &&
            tabPage === "orders.html"
        ) {
            isActive = true;
        }

        tab.classList.toggle(
            "active",
            isActive
        );

    });

});

/* =========================================
   SPLENDID STUDIO — ORDER FILTERS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const orderFilters =
        document.querySelectorAll(".order-filter");

    if (!orderFilters.length) {
        return;
    }

    orderFilters.forEach((filter) => {

        filter.addEventListener("click", () => {

            orderFilters.forEach((button) => {
                button.classList.remove("active");
            });

            filter.classList.add("active");

        });

    });

});
