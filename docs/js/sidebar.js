document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('main');
    const toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.innerHTML = '☰';
    document.body.appendChild(toggleButton);

    function showSidebar() {
        sidebar.style.left = '0';
        main.classList.add('sidebar-open');
        toggleButton.innerHTML = '×';
    }

    function hideSidebar() {
        sidebar.style.left = 'calc(-1 * var(--sidebar-width))';
        main.classList.remove('sidebar-open');
        toggleButton.innerHTML = '☰';
    }

    toggleButton.addEventListener('click', function() {
        if (sidebar.style.left === '0px') {
            hideSidebar();
        } else {
            showSidebar();
        }
    });

    sidebar.addEventListener('mouseleave', function() {
        hideSidebar();
    });

    // Adjust chatbot position when sidebar is open
    const chatbot = document.getElementById('chatbot-container');
    if (chatbot) {
        const adjustChatbotPosition = () => {
            if (sidebar.style.left === '0px') {
                chatbot.style.right = 'calc(20px + var(--sidebar-width))';
            } else {
                chatbot.style.right = '20px';
            }
        };

        new MutationObserver(adjustChatbotPosition).observe(sidebar, { attributes: true });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && event.target !== toggleButton) {
            hideSidebar();
        }
    });

    // Prevent closing when clicking inside the sidebar
    sidebar.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
