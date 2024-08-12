document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        main.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('open');
            main.classList.remove('sidebar-open');
        }
    });
});
