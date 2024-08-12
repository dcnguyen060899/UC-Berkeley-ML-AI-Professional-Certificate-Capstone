document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    let timeoutId;

    function showSidebar() {
        sidebar.style.left = '0';
        main.classList.add('sidebar-open');
    }

    function hideSidebar() {
        sidebar.style.left = 'calc(-1 * var(--sidebar-width))';
        main.classList.remove('sidebar-open');
    }

    document.addEventListener('mousemove', function(e) {
        const triggerDistance = 50; // Distance from the left edge to trigger the sidebar

        if (e.clientX < triggerDistance && e.clientY > 80) { // Check if below header
            clearTimeout(timeoutId);
            showSidebar();
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(hideSidebar, 300); // Delay before hiding the sidebar
        }
    });

    sidebar.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
    });

    sidebar.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(hideSidebar, 300);
    });
});
