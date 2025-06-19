 document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const mainNav = document.getElementById('main-nav');
            const topBar = document.querySelector('.header-contact-bar');
            const openSearchModalButton = document.getElementById('open-search-modal');
            const closeSearchModalButton = document.getElementById('close-search-modal');
            const searchOverlay = document.getElementById('search-overlay');

            // Get the initial offset top of the main nav BEFORE it becomes sticky
            // This is crucial for knowing when to make it sticky
            let mainNavInitialOffset = mainNav.offsetTop;

            // Update mainNavInitialOffset on window resize to ensure correct sticky behavior
            window.addEventListener('resize', () => {
                // Temporarily remove sticky class to get true offsetTop
                mainNav.classList.remove('sticky');
                mainNav.style.top = ''; // Reset top for accurate measurement
                mainNavInitialOffset = mainNav.offsetTop;
                // Re-apply sticky if needed after resize
                handleStickyNav();
            });

            // Sticky navigation logic
            function handleStickyNav() {
                // We don't use topBarHeight for the sticky position if we want it at the very top.
                // However, we still calculate it, just in case you decide to adjust it later.
                const topBarHeight = topBar ? topBar.offsetHeight : 0;

                if (window.scrollY >= mainNavInitialOffset) {
                    mainNav.classList.add('sticky');
                    mainNav.style.top = '0px'; // Set to 0px to stick directly to the top of the viewport
                } else {
                    mainNav.classList.remove('sticky');
                    mainNav.style.top = ''; // Remove the inline style
                }
            }

            window.addEventListener('scroll', handleStickyNav);
            handleStickyNav(); // Run on load to set initial state

            // Mobile Menu Logic
            if (mobileMenuToggle && mobileMenu) {
                mobileMenuToggle.addEventListener('click', function() {
                    mobileMenu.classList.toggle('active');
                });
            }

            // Handle mobile dropdowns
            const mobileDropdownItems = document.querySelectorAll('.dropdown-mobile-item > a');
            mobileDropdownItems.forEach(item => {
                item.addEventListener('click', function(event) {
                    // Prevent navigation if it has a dropdown
                    event.preventDefault();
                    const parentDropdown = this.parentElement;
                    parentDropdown.classList.toggle('active');
                });
            });

            // Search Modal Logic
            if (openSearchModalButton && searchOverlay && closeSearchModalButton) {
                openSearchModalButton.addEventListener('click', function() {
                    searchOverlay.classList.add('active');
                });

                closeSearchModalButton.addEventListener('click', function() {
                    searchOverlay.classList.remove('active');
                });

                // Close modal if clicking outside the modal content
                searchOverlay.addEventListener('click', function(event) {
                    if (event.target === searchOverlay) {
                        searchOverlay.classList.remove('active');
                    }
                });
            }
        });


        // The testimonial slider script is commented out or might be from a different file.
        // It's not directly related to the sticky navigation.
        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('testimonial-slider');
            const cards = document.querySelectorAll('.testimonial-card');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dotsContainer = document.getElementById('dots-container');

            let currentSlide = 0;

            function getCardsToShow() {
                if (window.innerWidth >= 768) {
                    return 2;
                }
                return 1;
            }

            function showSlide(index) {
                const cardsToShow = getCardsToShow();
                if (cards.length === 0) return;

                cards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('active');
                });

                const maxSlideIndex = Math.max(0, cards.length - cardsToShow);

                if (index > maxSlideIndex) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = maxSlideIndex;
                } else {
                    currentSlide = index;
                }

                for (let i = 0; i < cardsToShow; i++) {
                    if (cards[currentSlide + i]) {
                        cards[currentSlide + i].style.display = 'flex';
                        cards[currentSlide + i].classList.add('active');
                    }
                }
                if (dotsContainer) {
                    updateDots(maxSlideIndex + 1);
                }
            }

            function updateDots(numDots) {
                dotsContainer.innerHTML = '';
                for (let i = 0; i < numDots; i++) {
                    const dot = document.createElement('span');
                    dot.classList.add('dot');
                    if (i === currentSlide) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        showSlide(i);
                    });
                    dotsContainer.appendChild(dot);
                }
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showSlide(currentSlide + 1);
                });
            }
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showSlide(currentSlide - 1);
                });
            }

            window.addEventListener('resize', () => {
                showSlide(currentSlide);
            });

            if (cards.length > 0) {
                showSlide(currentSlide);
            }
        });