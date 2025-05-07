document.addEventListener("DOMContentLoaded", () => {
    //Seleccion de elementos del DOM
    const toggleButton = document.querySelector(".navbar__toogle-btn");
    const mobileMenu = document.querySelector(".mobile");
    const toggleMenu = () => {
        mobileMenu.style.display =
            mobileMenu.style.display === "none" || mobileMenu.style.display === ""
                ? "flex"
                : "none";
    }
    const hideMenuResize = () => {
        mobileMenu.style.display = "none"
    }
    toggleButton.addEventListener("click", toggleMenu);
    window.addEventListener("resize", hideMenuResize);
    window.addEventListener("load", hideMenuResize);
})
