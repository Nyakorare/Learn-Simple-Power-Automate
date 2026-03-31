// Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const sidebar = document.getElementById('sidebar');
    const navLinks = sidebar.querySelectorAll('a');

    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
    });

    mobileMenuClose.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                sidebar.classList.add('-translate-x-full');
            }
        });
    });

    // Desktop sidebar toggle
    const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle');
    const sidebarIcon = document.getElementById('sidebar-icon');
    const mainContent = document.getElementById('main-content');
    let sidebarVisible = true;

    // Initialize sidebar state for desktop
    function initializeSidebar() {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('-translate-x-full');
            mainContent.style.marginLeft = '16rem';
            desktopSidebarToggle.style.left = '17rem';
            desktopSidebarToggle.style.display = 'flex';
            sidebarVisible = true;
        } else {
            sidebar.classList.add('-translate-x-full');
            mainContent.style.marginLeft = '0';
            desktopSidebarToggle.style.display = 'none';
            sidebarVisible = false;
        }
    }

    desktopSidebarToggle.addEventListener('click', () => {
        if (sidebarVisible) {
            // Hide sidebar
            sidebar.classList.add('-translate-x-full');
            mainContent.style.marginLeft = '0';
            sidebarIcon.classList.remove('fa-bars');
            sidebarIcon.classList.add('fa-arrow-right');
            desktopSidebarToggle.style.left = '1rem';
        } else {
            // Show sidebar
            sidebar.classList.remove('-translate-x-full');
            mainContent.style.marginLeft = '16rem';
            sidebarIcon.classList.remove('fa-arrow-right');
            sidebarIcon.classList.add('fa-bars');
            desktopSidebarToggle.style.left = '17rem';
        }
        sidebarVisible = !sidebarVisible;
    });

    // Initialize on page load
    initializeSidebar();

    // Handle window resize
    window.addEventListener('resize', initializeSidebar);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });