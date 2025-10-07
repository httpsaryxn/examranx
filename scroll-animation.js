document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // This timeline will control the animation of the first section moving up
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-content", // Animate when the second section starts to enter
            start: "top bottom",       // Start when the top of section 2 hits the bottom of the viewport
            end: "top top",            // End when the top of section 2 hits the top of the viewport
            scrub: 1,                  // Smoothly link animation to scrollbar
        }
    });

    // The animation itself: move the fixed wrapper up and out of view
    tl.to(".viewport-wrapper", { 
        yPercent: -100, 
        ease: "none" 
    });



    // Add logic for the scroll-down button
    const scrollBtn = document.querySelector('.scroll-down-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: ".scroll-content",
                duration: 1.5, // A slightly longer duration for a smoother feel
                ease: "power2.inOut"
            });
        });
    }
});

