// Get the modal
var modal = document.getElementById("certificate-modal");

// Get the button that opens the modal
var btn = document.getElementById("certificate-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the image inside the modal
var img = document.getElementById("certificate-image");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the image, close the modal
window.onclick = function(event) {
    if (event.target == modal || event.target == span) {
        modal.style.display = "none";
    }
}

// Prevent the modal from closing when clicking on the image
img.onclick = function(event) {
    event.stopPropagation();
}
