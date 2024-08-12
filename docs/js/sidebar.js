document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".floating-sidebar");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "☰"; /* Hamburger icon */
    toggleButton.classList.add("toggle-sidebar-button");
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("expanded");
        toggleButton.classList.toggle("expanded");

        if (sidebar.classList.contains("expanded")) {
            toggleButton.textContent = "✕"; /* Close icon */
        } else {
            toggleButton.textContent = "☰"; /* Hamburger icon */
        }
    });
});
