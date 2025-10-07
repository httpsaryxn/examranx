document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.carousel-slides');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    // Exit if carousel elements aren't found
    if (!slidesContainer || !prevButton || !nextButton) return;

    let slides = document.querySelectorAll('.carousel-slide');
    if (slides.length <= 1) return; // No need for logic if there's only one slide

    // --- Seamless Loop Setup ---
    // 1. Clone the first and last slides to create a seamless loop effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    // 2. Add the clones to the slides container
    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slides[0]);

    // 3. Update the slides NodeList and set the initial state
    slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 1; // Start on the first "real" slide, not the clone
    let isTransitioning = false;

    // Function to instantly move the carousel without animation
    const setInitialPosition = () => {
        slidesContainer.style.transition = 'none';
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Use a tiny timeout to ensure the browser applies the initial active class after rendering
        setTimeout(() => {
            updateActiveClass();
        }, 50);
    };

    // Function to update which slide has the 'active' class for the fade animations
    const updateActiveClass = () => {
        // Find the index of the "real" slide that should be active
        let realIndex = currentIndex - 1;
        if (currentIndex === 0) { // If we're on the last clone...
            realIndex = slides.length - 3; // ...the real last slide should be active.
        } else if (currentIndex === slides.length - 1) { // If we're on the first clone...
            realIndex = 0; // ...the real first slide should be active.
        }

        // Apply 'active' class only to the visible, original slide
        slides.forEach((slide, index) => {
            // Check if the slide is an original slide (not a clone)
            if (index > 0 && index < slides.length - 1) {
                if ((index - 1) === realIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            } else {
                slide.classList.remove('active'); // Clones should not be active
            }
        });
    };

    // Set the carousel to its starting position
    setInitialPosition();

    // --- Event Listeners ---
    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        slidesContainer.style.transition = 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateActiveClass();
    });

    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        slidesContainer.style.transition = 'transform 0.6s cubic-bezier(0.45, 0.05, 0.55, 0.95)';
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateActiveClass();
    });

    // This listener handles the "jump" back to the real slide after a loop transition ends
    slidesContainer.addEventListener('transitionend', () => {
        isTransitioning = false;

        // If we landed on the cloned first slide (at the very end)
        if (currentIndex === slides.length - 1) {
            currentIndex = 1; // Jump back to the real first slide
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // If we landed on the cloned last slide (at the very beginning)
        if (currentIndex === 0) {
            currentIndex = slides.length - 2; // Jump back to the real last slide
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });
});

