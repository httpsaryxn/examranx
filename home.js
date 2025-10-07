document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    const slideDuration = 5000; // Time in milliseconds (5000ms = 5 seconds)
    // -------------------

    const slides = document.querySelectorAll('.background-slide');
    const headings = document.querySelectorAll('.slide-heading'); // Get all headings
    let currentSlideIndex = 0;

    if (slides.length > 0 && headings.length > 0) {
        // Function to change the active slide and heading
        function changeSlide() {
            // Remove 'active' class from the current slide and heading
            slides[currentSlideIndex].classList.remove('active');
            headings[currentSlideIndex].classList.remove('active');

            // Update the index to the next slide, looping back to the start
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;

            // Add 'active' class to the new slide and heading
            slides[currentSlideIndex].classList.add('active');
            headings[currentSlideIndex].classList.add('active');
        }

        // Set an interval to call the changeSlide function
        setInterval(changeSlide, slideDuration);
    }
});

