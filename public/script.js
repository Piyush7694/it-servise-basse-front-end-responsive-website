




      document.addEventListener('DOMContentLoaded', function() {
            const navbar = document.getElementById('mainNavbar');
            const mainNavLinks = document.getElementById('mainNavLinks');
            const menuBtn = document.querySelector('.menu-btn');
            const dropdowns = document.querySelectorAll('.dropdown');
            const scrollThreshold = 50;

            const searchToggleBtn = document.getElementById('searchToggleBtn');
            const searchOverlay = document.getElementById('searchOverlay');
            const closeSearchBtn = document.getElementById('closeSearchBtn');
            const searchInput = document.getElementById('searchInput');

            // Sticky Navbar functionality
            window.addEventListener('scroll', function() {
                if (window.scrollY > scrollThreshold) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });

            // Mobile menu toggle
            menuBtn.addEventListener('click', function() {
                mainNavLinks.classList.toggle('active');
            });

            // Dropdown toggle for mobile
            dropdowns.forEach(dropdown => {
                const dropdownLink = dropdown.querySelector('a');
                if (dropdownLink.querySelector('span')) {
                    dropdownLink.addEventListener('click', function(e) {
                        if (window.innerWidth < 768 && dropdown.contains(e.target)) {
                            e.preventDefault();
                            dropdown.classList.toggle('active');
                            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                            if (dropdownMenu) {
                                dropdownMenu.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                            }
                        }
                    });
                }
            });

            // Close mobile menu when a link inside it is clicked (unless it's a dropdown parent)
            mainNavLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth < 768 && !link.closest('.dropdown')) {
                        mainNavLinks.classList.remove('active');
                    }
                });
            });

            // Adjust nav-links display on resize to ensure correct behavior when switching between mobile/desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth >= 768) {
                    mainNavLinks.classList.remove('active');
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                        if (dropdownMenu) {
                             dropdownMenu.style.display = '';
                        }
                    });
                }
            });

            // Search Overlay Functionality
            searchToggleBtn.addEventListener('click', function() {
                searchOverlay.classList.add('active');
                searchInput.focus();
            });

            closeSearchBtn.addEventListener('click', function() {
                searchOverlay.classList.remove('active');
            });

            // Close overlay if clicking outside the search container
            searchOverlay.addEventListener('click', function(e) {
                if (e.target === searchOverlay) {
                    searchOverlay.classList.remove('active');
                }
            });
        });

 // Get all filter buttons and project cards
        const filterButtons = document.querySelectorAll('.filter-button');
        const projectCards = document.querySelectorAll('.card-container');

        /**
         * Filters the project cards based on the selected category.
         * Adds/removes 'hidden-card' class for animation.
         * @param {string} category - The category to filter by ('all' or specific category name).
         */
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        // Split categories and trim spaces for robust matching
        const categories = cardCategory.split(',').map(c => c.trim());
        if (category === 'all' || categories.includes(category)) {
            card.style.display = 'flex';
            setTimeout(() => {
                card.classList.remove('hidden-card');
            }, 10);
        } else {
            card.classList.add('hidden-card');
            card.addEventListener('transitionend', function handler() {
                if (card.classList.contains('hidden-card')) {
                    card.style.display = 'none';
                }
                card.removeEventListener('transitionend', handler);
            });
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
            const searchToggleBtn = document.getElementById('searchToggleBtn');
            const searchOverlay = document.getElementById('searchOverlay');
            const closeSearchBtn = document.getElementById('closeSearchBtn');

            // Function to open the search overlay
            function openSearch() {
                if (searchOverlay) {
                    searchOverlay.classList.add('active');
                    // Optionally focus the search input when overlay opens
                    const searchInput = searchOverlay.querySelector('.search-input');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }
            }

            // Function to close the search overlay
            function closeSearch() {
                if (searchOverlay) {
                    searchOverlay.classList.remove('active');
                }
            }

            // Event listener for opening the search
            if (searchToggleBtn) {
                searchToggleBtn.addEventListener('click', openSearch);
            }

            // Event listener for closing the search
            if (closeSearchBtn) {
                closeSearchBtn.addEventListener('click', closeSearch);
            }

            // Close search overlay when clicking outside it
            if (searchOverlay) {
                searchOverlay.addEventListener('click', (event) => {
                    if (event.target === searchOverlay) {
                        closeSearch();
                    }
                });
            }

            // Close search overlay with Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
                    closeSearch();
                }
            });
        });

        // Add click event listeners to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // No longer adding/removing 'active' class or its styles
                // The visual feedback for the selected category will now purely be the filtered cards.

                // Get the data-category attribute from the clicked button
                const selectedCategory = button.getAttribute('data-category');
                // Call the filter function
                filterProjects(selectedCategory);
            });
        });

        // Initialize by filtering "All" projects when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            filterProjects('all');
        });

        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('testimonial-slider');
            const cards = document.querySelectorAll('.testimonial-card');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dotsContainer = document.getElementById('dots-container');

            let currentSlide = 0;

            // Function to determine how many cards to show based on screen width
            function getCardsToShow() {
                if (window.innerWidth >= 768) { // md breakpoint equivalent
                    return 2;
                }
                return 1; // Default for smaller screens
            }

            // Function to show a specific set of slides
            function showSlide(index) {
                const cardsToShow = getCardsToShow();

                // Hide all cards first
                cards.forEach(card => {
                    card.style.display = 'none';
                    card.classList.remove('active');
                });

                // Calculate the maximum valid index for the first card of a visible set
                const maxSlideIndex = Math.max(0, cards.length - cardsToShow);

                // Set currentSlide, looping if bounds are exceeded
                if (index > maxSlideIndex) {
                    currentSlide = 0;
                } else if (index < 0) {
                    currentSlide = maxSlideIndex;
                } else {
                    currentSlide = index;
                }

                // Display the appropriate cards
                for (let i = 0; i < cardsToShow; i++) {
                    if (cards[currentSlide + i]) { // Check if the card exists
                        cards[currentSlide + i].style.display = 'flex';
                        cards[currentSlide + i].classList.add('active');
                    }
                }

                // Update navigation dots
                updateDots(maxSlideIndex + 1);
            }

            // Function to dynamically create and update navigation dots
            function updateDots(numDots) {
                dotsContainer.innerHTML = ''; // Clear existing dots

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

            // Event listener for next button
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });

            // Event listener for previous button
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });

            // Re-render slider and dots on window resize
            window.addEventListener('resize', () => {
                showSlide(currentSlide); // Re-evaluate cardsToShow and update display
            });

            // Initialize the slider
            showSlide(currentSlide);
        });