window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("mainNav");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}




// ...existing code...

// Slide-in effect for person image
document.addEventListener("DOMContentLoaded", function() {
    const personContainer = document.querySelector('.person-image-container');
    function checkSlideIn() {
        if (!personContainer) return;
        const rect = personContainer.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            personContainer.classList.add('slide-in');
        } else {
            personContainer.classList.remove('slide-in');
        }
    }
    window.addEventListener('scroll', checkSlideIn);
    checkSlideIn();
});
// ...existing code...

let lastScrollTop = 0;
const secondaryNav = document.querySelector('.secondary-navbar');
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', function() {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    // Stick the secondary nav just after the first nav, with less margin
    if (mainNav && secondaryNav) {
        const mainNavHeight = mainNav.offsetHeight;
        if (window.pageYOffset >= mainNav.offsetTop + mainNavHeight) {
            secondaryNav.style.position = 'fixed';
            secondaryNav.style.top = '0px';
            secondaryNav.style.width = '100%';
            secondaryNav.style.zIndex = 999;
             secondaryNav.classList.add('show-red-bg');
            // Thoda margin kam: sirf 4px (ya 0 bhi kar sakte ho)
            mainNav.style.marginBottom = '0';
        } else {
            secondaryNav.style.position = '';
            secondaryNav.style.top = '';
            secondaryNav.style.width = '';
            secondaryNav.style.zIndex = '';
            mainNav.style.marginBottom = '';
            secondaryNav.classList.remove('show-red-bg');
        }
    }

    // Show red bg when scrolling down
  
    lastScrollTop = st <= 0 ? 0 : st;
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