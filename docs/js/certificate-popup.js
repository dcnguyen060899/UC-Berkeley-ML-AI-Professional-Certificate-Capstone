document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("certificate-popup");
    const popupClose = document.querySelector(".popup-close");
    const certificateLink = document.querySelector("a[href='index_certificate.html']");

    // Open the popup when the link is clicked
    certificateLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        popup.style.display = "block";
    });

    // Close the popup when the close button is clicked
    popupClose.addEventListener("click", function() {
        popup.style.display = "none";
    });

    // Close the popup when the user clicks outside of it
    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
