export function initUserDropdown() {
    const userToggleBtn = document.getElementById("userToggle");
    const dropdownMenu = document.querySelector(
        ".user-dropdown .dropdown-menu"
    );
    const logoutBtn = document.getElementById("logout-btn");

    if (!userToggleBtn || !dropdownMenu) return;

    userToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const expanded = userToggleBtn.getAttribute("aria-expanded") === "true";
        userToggleBtn.setAttribute("aria-expanded", !expanded);
        dropdownMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
        dropdownMenu.classList.add("hidden");
        userToggleBtn.setAttribute("aria-expanded", "false");
    });

    logoutBtn?.addEventListener("click", () => {
        localStorage.clear();
        location.href = "/src/pages/login/login.html";
    });
}
