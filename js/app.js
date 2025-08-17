

document.addEventListener('DOMContentLoaded', function() {
    // --- Header Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // --- Gallery Carousel Logic ---
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = Array.from(galleryContainer.querySelectorAll('.gallery-item'));
    const totalItems = galleryItems.length;

    function updateGalleryPositions(centerIndex) {
        galleryItems.forEach((item, index) => {
            const position = (index - centerIndex + totalItems) % totalItems;
            
            // Remove all existing position classes
            item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next', 'hidden');
            
            // Apply new position classes based on calculated position
            if (position === 0) {
                item.classList.add('active');
            } else if (position === 1) {
                item.classList.add('next');
            } else if (position === totalItems - 1) {
                item.classList.add('prev');
            } else if (position === 2) {
                item.classList.add('far-next');
            } else if (position === totalItems - 2) {
                item.classList.add('far-prev');
            } else {
                item.classList.add('hidden');
            }
        });
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateGalleryPositions(index);
        });
    });

    // Set initial active card
    updateGalleryPositions(2); // Start with the third card as active

    // --- Feedback Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.feedback-card');
    const prevButton = document.querySelector('.arrow.left');
    const nextButton = document.querySelector('.arrow.right');
    const totalCards = cards.length;
    let currentIndex = 1; 
    let autoScrollInterval;

    // Create clones for infinite looping
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[totalCards - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, cards[0]);

    function getCardWidth() {
        if (!cards[0]) return 0;
        const style = window.getComputedStyle(cards[0]);
        const width = parseFloat(style.width);
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        return width + margin;
    }

    function updateCarousel(instant = false) {
        const cardWidth = getCardWidth();
        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s ease-in-out';
        }
        track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }
    
    // Function to move to the next slide
    function nextSlide() {
        if (currentIndex >= totalCards + 1) return;
        currentIndex++;
        updateCarousel();
    }

    // Function to move to the previous slide
    function prevSlide() {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateCarousel();
    }
    
    // Event listener for the end of the transition
    track.addEventListener('transitionend', () => {
        // If we are at the last clone, snap back to the first real card
        if (currentIndex === totalCards + 1) {
            track.style.transition = 'none';
            currentIndex = 1;
            updateCarousel(true);
        }
        // If we are at the first clone, snap back to the last real card
        if (currentIndex === 0) {
            track.style.transition = 'none';
            currentIndex = totalCards;
            updateCarousel(true);
        }
    });

    // Event listeners for buttons
    nextButton.addEventListener('click', () => {
        nextSlide();
        stopAutoScroll();
    });
    
    prevButton.addEventListener('click', () => {
        prevSlide();
        stopAutoScroll();
    });

    // Autoplay functionality
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            nextSlide();
            if (currentIndex >= totalCards + 1) {
                // The transition to the clone is in progress, wait for it to finish
            }
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Initial setup
    updateCarousel(true);
    startAutoScroll();s

    // Reset auto-scroll on user interaction
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Add responsiveness to carousel on window resize
    window.addEventListener('resize', () => {
        updateCarousel(true);
    });
});


var slider = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".arrow-left",
        prevEl: ".arrow-right"
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 50,
        },
    },
});


