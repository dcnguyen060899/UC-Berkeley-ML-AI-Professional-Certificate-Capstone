document.addEventListener("DOMContentLoaded", function () {
    const profileMenuButton = document.getElementById("profile-menu-button");
    const overlayMenu = document.getElementById("overlay-menu");
    const closeOverlayButton = document.getElementById("close-overlay");

    // Show overlay menu
    profileMenuButton.addEventListener("click", function () {
        overlayMenu.classList.remove("hidden");
    });

    // Close overlay menu
    closeOverlayButton.addEventListener("click", function () {
        overlayMenu.classList.add("hidden");
    });

    // Close overlay when clicking outside the content
    overlayMenu.addEventListener("click", function (event) {
        if (event.target === overlayMenu) {
            overlayMenu.classList.add("hidden");
        }
    });
});
