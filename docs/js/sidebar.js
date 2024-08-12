document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const chatbot = document.getElementById('chatbot-container');
    let timeoutId;

    function showSidebar() {
        sidebar.style.right = '0';
        main.classList.add('sidebar-open');
        if (chatbot) chatbot.classList.add('sidebar-open');
    }

    function hideSidebar() {
        sidebar.style.right = 'calc(-1 * var(--sidebar-width))';
        main.classList.remove('sidebar-open');
        if (chatbot) chatbot.classList.remove('sidebar-open');
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
