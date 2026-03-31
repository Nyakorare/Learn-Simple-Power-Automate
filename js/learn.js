// Mobile sidebar toggle
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const mobileSidebarClose = document.getElementById('mobile-sidebar-close');
    const lessonsSidebar = document.getElementById('lessons-sidebar');
    const lessonLinks = lessonsSidebar.querySelectorAll('a');

    mobileSidebarToggle.addEventListener('click', () => {
        lessonsSidebar.classList.remove('translate-x-full');
    });

    mobileSidebarClose.addEventListener('click', () => {
        lessonsSidebar.classList.add('translate-x-full');
    });

    lessonLinks.forEach(link => {
        link.addEventListener('click', () => {
            lessonsSidebar.classList.add('translate-x-full');
        });
    });

    // Desktop sidebar toggle
    const desktopSidebarToggle = document.getElementById('desktop-sidebar-toggle');
    const sidebarIcon = document.getElementById('sidebar-icon');
    const mainContent = document.getElementById('main-content');
    const floatingHomeBtn = document.getElementById('floating-home-btn');
    let sidebarVisible = true;

    // Initialize sidebar state for desktop
    function initializeSidebar() {
        if (window.innerWidth >= 1024) { // lg breakpoint
            lessonsSidebar.classList.remove('translate-x-full');
            mainContent.style.marginRight = '16rem';
            desktopSidebarToggle.style.right = '17rem';
            floatingHomeBtn.style.right = '17.5rem';
            desktopSidebarToggle.style.display = 'flex';
            floatingHomeBtn.style.display = 'flex';
            sidebarVisible = true;
        } else {
            lessonsSidebar.classList.add('translate-x-full');
            mainContent.style.marginRight = '0';
            desktopSidebarToggle.style.display = 'none';
            floatingHomeBtn.style.display = 'none';
            sidebarVisible = false;
        }
    }

    desktopSidebarToggle.addEventListener('click', () => {
        if (sidebarVisible) {
            // Hide sidebar
            lessonsSidebar.classList.add('translate-x-full');
            mainContent.style.marginRight = '0';
            sidebarIcon.classList.remove('fa-list');
            sidebarIcon.classList.add('fa-arrow-right');
            desktopSidebarToggle.style.right = '1rem';
            floatingHomeBtn.style.right = '1.5rem';
        } else {
            // Show sidebar
            lessonsSidebar.classList.remove('translate-x-full');
            mainContent.style.marginRight = '16rem';
            sidebarIcon.classList.remove('fa-arrow-right');
            sidebarIcon.classList.add('fa-list');
            desktopSidebarToggle.style.right = '17rem';
            floatingHomeBtn.style.right = '17.5rem';
        }
        sidebarVisible = !sidebarVisible;
    });

    // Initialize on page load
    initializeSidebar();

    // Handle window resize
    window.addEventListener('resize', initializeSidebar);

    // FAQ Accordion
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            // Close all other FAQs
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherContent = otherToggle.nextElementSibling;
                    const otherIcon = otherToggle.querySelector('i');
                    otherContent.classList.add('hidden');
                    otherIcon.classList.remove('rotate-180');
                }
            });

            // Toggle current FAQ
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('lesson-search');
    const lessonItems = document.querySelectorAll('#lessons-sidebar a');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        lessonItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide section headers based on visible items
        const sections = document.querySelectorAll('#lessons-sidebar > nav > div');
        sections.forEach(section => {
            const visibleItems = section.querySelectorAll('a[style*="flex"]');
            const header = section.querySelector('h3');
            if (visibleItems.length > 0) {
                header.style.display = 'flex';
            } else {
                header.style.display = 'none';
            }
        });
    });

    // Learning path buttons
    const pathButtons = document.querySelectorAll('.bg-green-500, .bg-blue-500, .bg-purple-500');
    pathButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add click animation
            button.classList.add('animate-pulse');
            setTimeout(() => {
                button.classList.remove('animate-pulse');
                alert('Learning path feature coming soon!');
            }, 500);
        });
    });

    // Progress section interactions
    const progressStats = document.querySelectorAll('.text-center.p-4');
    progressStats.forEach(stat => {
        stat.addEventListener('click', () => {
            const number = stat.querySelector('div:first-child').textContent;
            const label = stat.querySelector('div:last-child').textContent;
            alert(`You have ${number} ${label.toLowerCase()} lessons. Click on lessons in the sidebar to start learning!`);
        });
    });

    const continueButton = document.querySelector('button:has(.fa-play)');
    if (continueButton) {
        continueButton.addEventListener('click', () => {
            continueButton.classList.add('animate-bounce');
            setTimeout(() => {
                continueButton.classList.remove('animate-bounce');
                alert('Continue learning feature coming soon!');
            }, 1000);
        });
    }

    // Demo video placeholder
    const demoButton = document.querySelector('.bg-orange-500:has(.fa-play)');
    if (demoButton) {
        demoButton.addEventListener('click', () => {
            alert('Interactive demo will be available soon!');
        });
    }

    // Animate elements on scroll
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

    // Quick start guide interactions
    const guideSteps = document.querySelectorAll('.flex.items-start.gap-4.p-4');
    guideSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const stepNumber = index + 1;
            const stepTitle = step.querySelector('h4').textContent;
            alert(`Step ${stepNumber}: ${stepTitle}\n\nDetailed tutorial for this step will be available soon!`);
        });
    });

    // Add smooth scrolling for learning path buttons
    document.querySelectorAll('button:has(.fa-play)').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#lessons-sidebar');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });