  
        // JavaScript for mobile menu toggling
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                // Toggle the 'hidden' class to show/hide the mobile menu
                if (mobileMenu.style.display === 'block') {
                    mobileMenu.style.display = 'none';
                } else {
                    mobileMenu.style.display = 'block';
                }
            });
        }

        // Adjust mobile menu display on resize to ensure it's hidden on larger screens
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && mobileMenu) { // Corresponds to Tailwind's md breakpoint
                mobileMenu.style.display = 'none';
            }
        });