document.addEventListener('DOMContentLoaded', () => {

    initPageTransition();
    

    initSectionsAnimation();
    

    initExperienceTabs();
    

    initMobileNavigation();
    

    initCustomCursor();


    const sliders = document.querySelectorAll('.project-image-slider');
    if (!sliders.length) return;
    

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
    

    let activeSlider = null;
    let currentIndex = 0;
    

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


        images.forEach(img => {
            img.addEventListener('click', () => {
                if (img.classList.contains('active')) {
                    openZoom(slider, current);
                }
            });
        });
    });

    function modalPrevImage() {
        if (!activeSlider) return;
        
        const images = activeSlider.querySelectorAll('.slider-img');
        currentIndex = (currentIndex - 1 + images.length) % images.length;

        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });
        

        zoomImg.src = images[currentIndex].src;
    }
    
    function modalNextImage() {
        if (!activeSlider) return;
        
        const images = activeSlider.querySelectorAll('.slider-img');
        currentIndex = (currentIndex + 1) % images.length;
        

        images.forEach((img, i) => {
            img.classList.toggle('active', i === currentIndex);
        });
        

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
    

    modalLeftArrow.addEventListener('click', modalPrevImage);
    modalRightArrow.addEventListener('click', modalNextImage);
    closeModal.addEventListener('click', closeZoom);
    zoomImg.addEventListener('click', (e) => {
        e.stopPropagation();
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


function initPageTransition() {
    const transition = document.querySelector('.page-transition');
    

    setTimeout(() => {
        transition.classList.add('loaded');
    }, 500);
}


function initSectionsAnimation() {
    const sections = document.querySelectorAll('section');
    

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    };

    const handleScroll = () => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    };
    

    document.querySelector('.hero').classList.add('visible');
    

    window.addEventListener('scroll', handleScroll);

    handleScroll();
}


function initExperienceTabs() {
    const companyBtns = document.querySelectorAll('.company-btn');
    const jobContents = document.querySelectorAll('.job-content');
    
    companyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            companyBtns.forEach(b => b.classList.remove('active'));
            jobContents.forEach(content => content.classList.remove('active'));
            

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}


function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorInner = document.querySelector('.cursor-inner');
    
    if (!cursor || !cursorInner) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    

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


function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav ul li a');

    if (!hamburger || !mobileNav || !overlay) {
        console.error('Mobile navigation elements not found');
        return;
    }
    

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        

        hamburger.classList.toggle('active');
        
        console.log('Hamburger clicked, mobile nav active:', mobileNav.classList.contains('active'));
    });
    

    overlay.addEventListener('click', closeMenu);
    

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    function closeMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        hamburger.classList.remove('active');
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });
}


const sketch = function(p) {

    let angle = 0;
    let angleVariation = 0;
    let branchRatio = 0.67;
    let initialDepth = 9;
    
    let time = 0;
    const transitionDuration = 100; 
    let transitionProgress = 0; 
    let animationPhase = 0; 
    
    const palettes = [
        { 
            background: [10, 25, 47],
            primary: [100, 255, 218],
            secondary: [80, 200, 240], 
            accent: [120, 90, 220]
        }
    ];
    
    let currentPalette = 0;
    
    p.setup = function() {
        let canvas = p.createCanvas(250, 250);
        canvas.parent('canvas-container');
        p.frameRate(30);
        p.strokeCap(p.ROUND);
    };
    
    function drawTree(x, y, length, angle, depth, palette, progress) {
        if (depth <= 0) return;
        

        const x2 = x + p.cos(angle) * length;
        const y2 = y + p.sin(angle) * length;
        
        const lineColor = p.color(palette.primary[0], palette.primary[1], palette.primary[2], 230);
        p.stroke(lineColor);
        p.strokeWeight(Math.max(1, depth * 0.25)); 
        p.line(x, y, x2, y2);
        

        let leftAngle, rightAngle, leftRatio, rightRatio;
        
        if (animationPhase === 0) {
            const classicAngleOffset = p.QUARTER_PI * (0.7 + angleVariation);
            const pythagAngle = p.PI/4 * (1 + 0.2 * p.sin(time * 0.1));
            

            leftAngle = p.lerp(angle - classicAngleOffset, angle - pythagAngle, progress);
            rightAngle = p.lerp(angle + classicAngleOffset, angle + pythagAngle, progress);
            leftRatio = p.lerp(branchRatio, 0.71, progress);
            rightRatio = p.lerp(branchRatio, 0.71, progress);
        } 
        else if (animationPhase === 1) {

            const pythagAngle = p.PI/4 * (1 + 0.2 * p.sin(time * 0.1));
            

            leftAngle = p.lerp(angle - pythagAngle, angle - p.HALF_PI, progress);
            rightAngle = p.lerp(angle + pythagAngle, angle + p.HALF_PI, progress);
            
            // Interpolate branch ratios
            leftRatio = p.lerp(0.71, 0.7, progress);
            rightRatio = p.lerp(0.71, 0.7, progress);
        }
        else { // animationPhase === 2

            const classicAngleOffset = p.QUARTER_PI * (0.7 + angleVariation);
            

            leftAngle = p.lerp(angle - p.HALF_PI, angle - classicAngleOffset, progress);
            rightAngle = p.lerp(angle + p.HALF_PI, angle + classicAngleOffset, progress);
            

            leftRatio = p.lerp(0.7, branchRatio, progress);
            rightRatio = p.lerp(0.7, branchRatio, progress);
        }
        

        drawTree(x2, y2, length * leftRatio, leftAngle, depth - 1, palette, progress);
        drawTree(x2, y2, length * rightRatio, rightAngle, depth - 1, palette, progress);
    }
    
    function updateAnimationParameters() {

        time += 0.02;
        

        transitionProgress += 1/transitionDuration;
        

        if (transitionProgress >= 1) {
            transitionProgress = 0;
            animationPhase = (animationPhase + 1) % 3;
        }
        
        angle = -p.HALF_PI + p.sin(time * 0.01) * 0.05; 
        angleVariation = p.map(p.sin(time * 0.1), -1, 1, 0.05, 0.15); 
        
        branchRatio = 0.67 + p.sin(time * 0.03) * 0.03;
    }
    
    p.draw = function() {
        updateAnimationParameters();
        

        p.background(...palettes[currentPalette].background);
        

        p.push();
        const startX = p.width / 2;
        const startY = p.height * 0.9;
        const startLength = p.height * 0.25;
        

        drawTree(
            startX, 
            startY, 
            startLength, 
            angle, 
            initialDepth,
            palettes[currentPalette],
            transitionProgress
        );
        p.pop();
        
    };
};

// Create a new p5 instance with the sketch
new p5(sketch); 
