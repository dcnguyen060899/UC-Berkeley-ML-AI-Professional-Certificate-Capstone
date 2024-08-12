document.addEventListener("DOMContentLoaded", function () {
    const certificateLink = document.getElementById("certificate-link");
    const popup = document.getElementById("certificate-popup");
    const popupClose = document.querySelector(".popup-close");

    // Show the popup when the link is clicked
    certificateLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        popup.style.display = "block";
    });

    // Hide the popup when the close button is clicked
    popupClose.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Hide the popup when clicking outside of the popup content
    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});
