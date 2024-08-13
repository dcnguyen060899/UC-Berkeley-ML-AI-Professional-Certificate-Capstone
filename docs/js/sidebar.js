document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarIndicator = document.getElementById('sidebar-indicator');
    const main = document.querySelector('main');
    let timeoutId;

    function showSidebar() {
        sidebar.classList.add('open');
        main.classList.add('sidebar-open');
    }

    function hideSidebar() {
        sidebar.classList.remove('open');
        main.classList.remove('sidebar-open');
    }

    sidebarIndicator.addEventListener('click', function() {
        if (sidebar.classList.contains('open')) {
            hideSidebar();
        } else {
            showSidebar();
        }
    });

    sidebar.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
        showSidebar();
    });

    sidebar.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(hideSidebar, 300);
    });

    sidebarIndicator.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
        showSidebar();
    });

    document.addEventListener('mousemove', function(e) {
        if (!sidebar.classList.contains('open')) {
            const triggerDistance = 50;
            if (e.clientX < triggerDistance) {
                clearTimeout(timeoutId);
                showSidebar();
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(hideSidebar, 300);
            }
        }
    });
});
