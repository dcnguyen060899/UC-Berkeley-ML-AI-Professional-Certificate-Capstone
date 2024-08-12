document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');
    const body = document.body;

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        body.classList.toggle('sidebar-active');
    });

    // Close sidebar when clicking outside of it
    mainContent.addEventListener('click', function() {
        if (body.classList.contains('sidebar-active')) {
            sidebar.classList.remove('active');
            body.classList.remove('sidebar-active');
        }
    });
});
