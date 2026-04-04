(function () {
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const mobileSidebarClose = document.getElementById('mobile-sidebar-close');
    const lessonsSidebar = document.getElementById('lessons-sidebar');
    const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle');
    const sidebarIcon = document.getElementById('sidebar-icon');
    const mainContent = document.getElementById('main-content');
    const floatingHomeBtn = document.getElementById('floating-home-btn');

    if (!lessonsSidebar || !mainContent) return;

    const lessonLinks = lessonsSidebar.querySelectorAll('a.lesson-link');
    let desktopCollapsed = false;

    function setSidebarOpen(open) {
        if (open) {
            lessonsSidebar.classList.remove('translate-x-full');
        } else {
            lessonsSidebar.classList.add('translate-x-full');
        }
    }

    function applyWideLayout() {
        const open = !desktopCollapsed;
        setSidebarOpen(open);
        mainContent.style.marginRight = open ? '16rem' : '0';
        if (desktopSidebarToggle) {
            desktopSidebarToggle.style.display = 'flex';
            desktopSidebarToggle.style.right = open ? '17rem' : '1rem';
        }
        if (floatingHomeBtn) {
            floatingHomeBtn.style.display = 'flex';
            floatingHomeBtn.style.right = open ? '17.5rem' : '1.5rem';
        }
        if (sidebarIcon) {
            if (open) {
                sidebarIcon.classList.remove('fa-arrow-right');
                sidebarIcon.classList.add('fa-list');
            } else {
                sidebarIcon.classList.remove('fa-list');
                sidebarIcon.classList.add('fa-arrow-right');
            }
        }
    }

    function applyNarrowLayout() {
        setSidebarOpen(false);
        mainContent.style.marginRight = '0';
        if (desktopSidebarToggle) {
            desktopSidebarToggle.style.display = 'none';
        }
        if (floatingHomeBtn) {
            floatingHomeBtn.style.display = 'flex';
            floatingHomeBtn.style.right = '1.5rem';
        }
    }

    function placeChrome() {
        if (window.innerWidth >= 1024) {
            applyWideLayout();
        } else {
            applyNarrowLayout();
        }
    }

    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', () => setSidebarOpen(true));
    }
    if (mobileSidebarClose) {
        mobileSidebarClose.addEventListener('click', () => setSidebarOpen(false));
    }

    lessonLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            }
        });
    });

    if (desktopSidebarToggle) {
        desktopSidebarToggle.addEventListener('click', () => {
            if (window.innerWidth < 1024) return;
            desktopCollapsed = !desktopCollapsed;
            applyWideLayout();
        });
    }

    placeChrome();
    window.addEventListener('resize', placeChrome);

    const searchInput = document.getElementById('lesson-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const term = searchInput.value.trim().toLowerCase();
            lessonLinks.forEach((item) => {
                const text = item.textContent.toLowerCase();
                if (!term || text.includes(term)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            lessonsSidebar.querySelectorAll('.sidebar-group').forEach((group) => {
                const visible = group.querySelectorAll('a.lesson-link:not(.hidden)');
                const header = group.querySelector('h3');
                if (header) {
                    header.classList.toggle('hidden', visible.length === 0);
                }
            });
        });
    }

    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }

    const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    document.querySelectorAll('section').forEach((section) => observer.observe(section));
})();
