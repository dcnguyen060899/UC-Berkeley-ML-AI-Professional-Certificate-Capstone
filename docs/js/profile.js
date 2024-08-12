document.addEventListener("DOMContentLoaded", function () {
    // Toggle Profile Overlay
    const profileToggle = document.getElementById('profile-overlay-toggle');
    const profileOverlay = document.getElementById('profile-overlay');
    const closeOverlayBtn = document.getElementById('close-overlay');
    const resumeBtn = document.getElementById('resume-btn');
    const certificationBtn = document.getElementById('certification-btn');
    const resumeContent = document.getElementById('resume-content');
    const certificationContent = document.getElementById('certification-content');

    profileToggle.addEventListener('click', function () {
        profileOverlay.style.display = 'flex';
    });

    closeOverlayBtn.addEventListener('click', function () {
        profileOverlay.style.display = 'none';
        resumeContent.style.display = 'none';
        certificationContent.style.display = 'none';
    });

    resumeBtn.addEventListener('click', function () {
        resumeContent.style.display = 'block';
        certificationContent.style.display = 'none';
    });

    certificationBtn.addEventListener('click', function () {
        certificationContent.style.display = 'block';
        resumeContent.style.display = 'none';
    });
});
