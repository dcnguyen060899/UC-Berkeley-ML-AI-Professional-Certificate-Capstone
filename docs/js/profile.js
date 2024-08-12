document.addEventListener("DOMContentLoaded", function () {
    const popupButtons = document.querySelectorAll(".popup-btn");
    const popups = document.querySelectorAll(".popup");
    const closeButtons = document.querySelectorAll(".close-btn");

    // Open the pop-up
    popupButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const popup = document.getElementById(targetId);
            popup.style.display = "block";
        });
    });

    // Close the pop-up when the close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const popup = this.closest(".popup");
            popup.style.display = "none";
        });
    });

    // Close the pop-up when clicking outside the content area
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("popup")) {
            event.target.style.display = "none";
        }
    });
});
