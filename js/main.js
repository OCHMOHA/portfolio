// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page transitions
    initPageTransition();
    
    // Initialize sections animation
    initSectionsAnimation();
    
    // Initialize experience tabs
    initExperienceTabs();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize custom cursor
    initCustomCursor();

    // --- Project Image Sliders & Zoom ---
    const sliders = document.querySelectorAll('.project-image-slider');
    if (!sliders.length) return;
    
    // Create a single modal for all sliders
    let zoomModal = document.getElementById('slider-zoom-modal');
    if (!zoomModal) {
        zoomModal = document.createElement('div');
        zoomModal.id = 'slider-zoom-modal';
        zoomModal.innerHTML = `
            <button class="close-modal">&times;</button>
            <div class="modal-arrow modal-arrow-left"><i class="fas fa-chevron-left"></i></div>
            <img src="" alt="Zoomed Screenshot">
            <div class="modal-arrow modal-arrow-right"><i class="fas fa-chevron-right"></i></div>
        `;
        document.body.appendChild(zoomModal);
    }
    
    const zoomImg = zoomModal.querySelector('img');
    const closeModal = zoomModal.querySelector('.close-modal');
    const modalLeftArrow = zoomModal.querySelector('.modal-arrow-left');
    const modalRightArrow = zoomModal.querySelector('.modal-arrow-right');
    
    // Active slider and current image index
    let activeSlider = null;
    let currentIndex = 0;
    
    // Initialize each slider
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-img');
        const leftArrow = slider.querySelector('.slider-arrow-left');
        const rightArrow = slider.querySelector('.slider-arrow-right');
        let current = 0;

        function showImage(idx) {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === idx);
            });
            current = idx;
        }

        function prevImage() {
            showImage((current - 1 + images.length) % images.length);
        }
        
        function nextImage() {
            showImage((current + 1) % images.length);
        }

        slider.addEventListener('mouseenter', () => {
            leftArrow.style.display = rightArrow.style.display = 'flex';
        });
        
        slider.addEventListener('mouseleave', () => {
            leftArrow.style.display = rightArrow.style.display = 'none';
        });
        
        leftArrow.addEventListener('click', prevImage);
        rightArrow.addEventListener('click', nextImage);

        // Handle image clicks to open modal
        images.forEach(img => {
            img.addEventListener('click', () => {
                if (img.classList.contains('active')) {
                    openZoom(slider, current);
                }
            });
        });
    });
    
    // Function to navigate images in the modal
    function modalPrevImage() {
        if (!activeSlider) return;
        
        const images = activeSlider.querySelectorAll('.slider-img');
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        
        // Update thumbnail slider
        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });
        
        // Update modal image
        zoomImg.src = images[currentIndex].src;
    }
    
    function modalNextImage() {
        if (!activeSlider) return;
        
        const images = activeSlider.querySelectorAll('.slider-img');
        currentIndex = (currentIndex + 1) % images.length;
        
        // Update thumbnail slider
        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });
        
        // Update modal image
        zoomImg.src = images[currentIndex].src;
    }
    
    function openZoom(slider, index) {
        activeSlider = slider;
        currentIndex = index;
        const images = slider.querySelectorAll('.slider-img');
        zoomImg.src = images[currentIndex].src;
        zoomModal.classList.add('active');
    }
    
    function closeZoom() {
        zoomModal.classList.remove('active');
        zoomImg.src = '';
        activeSlider = null;
    }
    
    // Add event listeners for modal navigation
    modalLeftArrow.addEventListener('click', modalPrevImage);
    modalRightArrow.addEventListener('click', modalNextImage);
    closeModal.addEventListener('click', closeZoom);
    zoomImg.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubbling to modal background
        closeZoom();
    });
    zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal) closeZoom();
    });
    document.addEventListener('keydown', (e) => {
        if (zoomModal.classList.contains('active')) {
            if (e.key === 'Escape' || e.key === ' ') {
                closeZoom();
            } else if (e.key === 'ArrowLeft') {
                modalPrevImage();
            } else if (e.key === 'ArrowRight') {
                modalNextImage();
            }
        }
    });
});

// Page transition animation
function initPageTransition() {
    const transition = document.querySelector('.page-transition');
    
    // Add loaded class after a small delay to trigger animation
    setTimeout(() => {
        transition.classList.add('loaded');
    }, 500);
}

// Animate sections on scroll
function initSectionsAnimation() {
    const sections = document.querySelectorAll('section');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    };
    
    // Add visible class to elements in viewport
    const handleScroll = () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    };
    
    // Add visible class to hero section on page load
    document.querySelector('.hero').classList.add('visible');
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load
    handleScroll();
}

// Experience tabs functionality
function initExperienceTabs() {
    const companyBtns = document.querySelectorAll('.company-btn');
    const jobContents = document.querySelectorAll('.job-content');
    
    companyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            companyBtns.forEach(b => b.classList.remove('active'));
            jobContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and matching content
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Custom cursor animation
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorInner = document.querySelector('.cursor-inner');
    
    if (!cursor || !cursorInner) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    // Add grow effect on hover over links and buttons
    const hoverTargets = document.querySelectorAll('a, button, .btn-primary');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
            cursorInner.classList.add('cursor-grow');
        });
        
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
            cursorInner.classList.remove('cursor-grow');
        });
    });
}

// Mobile navigation functionality
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav ul li a');
    
    // Toggle mobile navigation
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Animate hamburger menu
        hamburger.classList.toggle('active');
    });
    
    // Close mobile navigation when overlay is clicked
    overlay.addEventListener('click', closeMenu);
    
    // Close mobile navigation when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    function closeMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        hamburger.classList.remove('active');
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

/**
 * Recursive Binary Tree Fractal Animation
 * This implementation creates an animated fractal tree with dynamic properties
 * that evolve over time, creating an engaging visual experience.
 */
const sketch = function(p) {
    // Animation parameters
    let angle = 0;
    let angleVariation = 0;
    let branchRatio = 0.67;
    let initialDepth = 9;
    
    // Animation timing and transformation
    let time = 0;
    const transitionDuration = 100; // reduced from 500 to speed up by ~1 second
    let transitionProgress = 0; // 0 to 1 for animation sequence
    let animationPhase = 0; // 0-2 for tracking current phase
    
    // Color palettes (teal focus)
    const palettes = [
        // Simple teal (matching reference image)
        { 
            background: [10, 25, 47],
            primary: [100, 255, 218],
            secondary: [80, 200, 240], 
            accent: [120, 90, 220]
        }
    ];
    
    // Current color palette
    let currentPalette = 0;
    
    p.setup = function() {
        let canvas = p.createCanvas(250, 250);
        canvas.parent('canvas-container');
        p.frameRate(30);
        p.strokeCap(p.ROUND);
    };
    
    function drawTree(x, y, length, angle, depth, palette, progress) {
        // Base case for recursion
        if (depth <= 0) return;
        
        // Calculate endpoint coordinates
        const x2 = x + p.cos(angle) * length;
        const y2 = y + p.sin(angle) * length;
        
        // Use a consistent teal color with reduced opacity - no fills, just lines
        const lineColor = p.color(palette.primary[0], palette.primary[1], palette.primary[2], 230);
        
        // Draw branch - thinner lines for cleaner look
        p.stroke(lineColor);
        p.strokeWeight(Math.max(1, depth * 0.25)); // Reduced from 0.4 to 0.25 for thinner lines
        p.line(x, y, x2, y2);
        
        // Calculate branching parameters based on transformation progress
        let leftAngle, rightAngle, leftRatio, rightRatio;
        
        // Transform between animation phases based on progress
        // Phase 0: Classic symmetric tree
        // Phase 1: Pythagoras-like tree 
        // Phase 2: H-tree fractal variation
        
        if (animationPhase === 0) {
            // Transitioning from Classic to Pythagoras
            const classicAngleOffset = p.QUARTER_PI * (0.7 + angleVariation);
            const pythagAngle = p.PI/4 * (1 + 0.2 * p.sin(time * 0.1));
            
            // Interpolate angles
            leftAngle = p.lerp(angle - classicAngleOffset, angle - pythagAngle, progress);
            rightAngle = p.lerp(angle + classicAngleOffset, angle + pythagAngle, progress);
            
            // Interpolate branch ratios
            leftRatio = p.lerp(branchRatio, 0.71, progress);
            rightRatio = p.lerp(branchRatio, 0.71, progress);
        } 
        else if (animationPhase === 1) {
            // Transitioning from Pythagoras to H-tree
            const pythagAngle = p.PI/4 * (1 + 0.2 * p.sin(time * 0.1));
            
            // Interpolate angles (from Pythagoras angles to perpendicular H-tree angles)
            leftAngle = p.lerp(angle - pythagAngle, angle - p.HALF_PI, progress);
            rightAngle = p.lerp(angle + pythagAngle, angle + p.HALF_PI, progress);
            
            // Interpolate branch ratios
            leftRatio = p.lerp(0.71, 0.7, progress);
            rightRatio = p.lerp(0.71, 0.7, progress);
        }
        else { // animationPhase === 2
            // Transitioning from H-tree back to Classic
            const classicAngleOffset = p.QUARTER_PI * (0.7 + angleVariation);
            
            // Interpolate angles
            leftAngle = p.lerp(angle - p.HALF_PI, angle - classicAngleOffset, progress);
            rightAngle = p.lerp(angle + p.HALF_PI, angle + classicAngleOffset, progress);
            
            // Interpolate branch ratios
            leftRatio = p.lerp(0.7, branchRatio, progress);
            rightRatio = p.lerp(0.7, branchRatio, progress);
        }
        
        // Recursive branching with interpolated parameters
        drawTree(x2, y2, length * leftRatio, leftAngle, depth - 1, palette, progress);
        drawTree(x2, y2, length * rightRatio, rightAngle, depth - 1, palette, progress);
    }
    
    function updateAnimationParameters() {
        // Update time
        time += 0.02;
        
        // Update transition progress
        transitionProgress += 1/transitionDuration;
        
        // When transition completes, move to next phase
        if (transitionProgress >= 1) {
            transitionProgress = 0;
            animationPhase = (animationPhase + 1) % 3;
        }
        
        // Update animation parameters based on time
        angle = -p.HALF_PI + p.sin(time * 0.01) * 0.05; // Mostly upward with subtle movement
        angleVariation = p.map(p.sin(time * 0.1), -1, 1, 0.05, 0.15); // Subtle variation
        
        // Branch ratio can subtly change over time
        branchRatio = 0.67 + p.sin(time * 0.03) * 0.03;
    }
    
    p.draw = function() {
        // Update animation parameters
        updateAnimationParameters();
        
        // Clear canvas with background color
        p.background(...palettes[currentPalette].background);
        
        // Draw tree starting from bottom center
        p.push();
        const startX = p.width / 2;
        const startY = p.height * 0.9;
        const startLength = p.height * 0.25;
        
        // Draw main tree with current transition progress
        drawTree(
            startX, 
            startY, 
            startLength, 
            angle, // Mostly upward with slight variation
            initialDepth,
            palettes[currentPalette],
            transitionProgress
        );
        p.pop();
        
        // Optional: Display current phase name for debugging
        /*
        p.fill(255);
        p.noStroke();
        p.textSize(12);
        let phaseName = ["Classic → Pythagoras", "Pythagoras → H-tree", "H-tree → Classic"][animationPhase];
        p.text(phaseName + " (" + Math.floor(transitionProgress * 100) + "%)", 10, 20);
        */
    };
};

// Create a new p5 instance with the sketch
new p5(sketch); 