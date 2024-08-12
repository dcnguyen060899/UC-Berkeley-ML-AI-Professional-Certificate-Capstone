// Function to open a pop-up
function openPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = "block";
}

// Function to close a pop-up
function closePopup(event) {
    if (event.target.classList.contains('close-btn') || event.target.classList.contains('popup')) {
        event.target.closest('.popup').style.display = "none";
    }
}

// Event listeners for pop-ups
document.addEventListener("DOMContentLoaded", function() {
    // Assign click event to all close buttons
    var closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', closePopup);
    });

    // Assign click event to the document to close pop-up when clicking outside the content
    var popups = document.querySelectorAll('.popup');
    popups.forEach(function(popup) {
        popup.addEventListener('click', closePopup);
    });

    // Example: Trigger pop-ups when corresponding buttons or icons are clicked
    document.getElementById('executive-summary-icon').addEventListener('click', function() {
        openPopup('executive-summary-popup');
    });
    document.getElementById('project-goals-icon').addEventListener('click', function() {
        openPopup('project-goals-popup');
    });
    document.getElementById('key-findings-icon').addEventListener('click', function() {
        openPopup('key-findings-popup');
    });
    document.getElementById('model-performance-icon').addEventListener('click', function() {
        openPopup('model-performance-popup');
    });
    document.getElementById('business-impact-icon').addEventListener('click', function() {
        openPopup('business-impact-popup');
    });
    document.getElementById('recommendations-icon').addEventListener('click', function() {
        openPopup('recommendations-popup');
    });
});
