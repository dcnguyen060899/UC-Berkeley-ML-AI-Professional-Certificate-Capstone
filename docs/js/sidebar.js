document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    let timeoutId;

    function showSidebar() {
        sidebar.style.right = '0';
        main.classList.add('sidebar-open');
    }

    function hideSidebar() {
        sidebar.style.right = '-300px';
        main.classList.remove('sidebar-open');
    }

    document.addEventListener('mousemove', function(e) {
        const windowWidth = window.innerWidth;
        const triggerDistance = 50; // Distance from the right edge to trigger the sidebar

        if (e.clientX > windowWidth - triggerDistance) {
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
