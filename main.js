document.addEventListener("DOMContentLoaded", () => {
    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");
    const mobileNav = document.getElementById("mobileNav");
    const overlay = document.getElementById("overlay");
    const mainContent = document.getElementById("mainContent");

    function openNav() {
        mobileNav.classList.remove("translate-x-full");
        overlay.classList.add("opacity-50", "pointer-events-auto");
        
        // Aria attributes for accessibility
        mobileNav.setAttribute("aria-hidden", "false");
        mainContent.setAttribute("aria-hidden", "true");

        // Set focus to close button
        closeMenu.focus();
        
        // Trap focus inside menu
        document.addEventListener("keydown", trapFocus);
    }

    function closeNav() {
        mobileNav.classList.add("translate-x-full");
        overlay.classList.remove("opacity-50", "pointer-events-auto");
        
        // Reset aria attributes
        mobileNav.setAttribute("aria-hidden", "true");
        mainContent.setAttribute("aria-hidden", "false");

        // Return focus to openMenu button
        openMenu.focus();

        // Remove event listener for focus trap
        document.removeEventListener("keydown", trapFocus);
    }

    function trapFocus(event) {
        const focusableElements = mobileNav.querySelectorAll("a, button, input, textarea, select");
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.key === "Tab") {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }

        if (event.key === "Escape") {
            closeNav();
        }
    }

    openMenu.addEventListener("click", openNav);
    closeMenu.addEventListener("click", closeNav);
    overlay.addEventListener("click", closeNav);
});
