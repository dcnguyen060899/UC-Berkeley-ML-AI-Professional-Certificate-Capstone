document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarIndicator = document.getElementById('sidebar-indicator');
    const main = document.querySelector('main');
    let timeoutId;

    function showSidebar() {
        sidebar.classList.add('open');
        main.classList.add('sidebar-open');
        sidebarIndicator.style.left = '250px';
    }

    function hideSidebar() {
        sidebar.classList.remove('open');
        main.classList.remove('sidebar-open');
        sidebarIndicator.style.left = '0';
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
    });

    sidebar.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(hideSidebar, 300);
    });
});
