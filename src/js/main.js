/* Your JS here. */
/*references
https://javascript.plainenglish.io/sticky-smooth-sliding-navbar-on-scroll-javascript-coderfact-e0a12cb313d1 
https://www.youtube.com/watch?v=JfngErfWtsA
https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
https://www.youtube.com/watch?v=RakiGlEkvMg  
https://www.youtube.com/watch?v=9HcxHDS2w1s
https://www.youtube.com/watch?v=VYsVOamdB0g
https://www.youtube.com/watch?v=z1pRUM3o2oU
https://www.youtube.com/watch?v=Nw18SQ9mU6I
*/    

document.addEventListener('DOMContentLoaded', () => {
    //3 Position Indicator
    const navLinks = document.querySelectorAll('nav#main_nav a');
    const sections = document.querySelectorAll('main section, footer#contact');
    //4 Navbar Resizing
    const navBar = document.querySelector('nav#main_nav');
    //6 Carousel
    const track = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.buttons.next');
    const prevButton = document.querySelector('.buttons.prev');
    //11 Modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const triggerImages = document.querySelectorAll(".modal-trigger"); 
    const closeButton = document.querySelector("#imageModal .close-button"); 
    const modalOverlay = document.querySelector("#imageModal .overlay"); 

    if (sections.length === 0 || navLinks.length === 0) {
        return;  
    }
    
    //4 Navbar Resizing
    const handleNavResize = () => {
        if (window.scrollY > 20) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    };
    //6 Carousel
    if (track && prevButton && nextButton) {
        const slides = Array.from(track.children);
        let slideWidth = slides[0].getBoundingClientRect().width;
            let currentIndex = 0;

            const moveToSlide = (newIndex) => {
                if (newIndex < 0) {
                    newIndex = slides.length - 1;
                } else if (newIndex >= slides.length) {
                    newIndex = 0;
                }
                track.style.transform = `translateX(-${slideWidth * newIndex}px)`;
                currentIndex = newIndex;
            };

            nextButton.addEventListener('click', () => {
                moveToSlide(currentIndex + 1);
            });

            prevButton.addEventListener('click', () => {
                moveToSlide(currentIndex - 1);
            });
            
            window.addEventListener('resize', () => {
                slideWidth = slides[0].getBoundingClientRect().width;
                track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
            });
    }
    //11 Modal
    const openModal = function() {
        modal.classList.add('is-open');
        modalImg.src = this.src; 
        document.body.classList.add('modal-is-open'); 
    }

    const closeModal = function() {
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-is-open');
    }

    triggerImages.forEach(img => {
        img.addEventListener('click', openModal);
    });

    if (closeButton) closeButton.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    //3 Position Indicator
    const onScroll = () => {
        const navHeight = navBar.offsetHeight;
        const scrollPosition = window.scrollY;

        let currentSectionId = '';

        sections.forEach(section => {
            if (section.offsetTop - navHeight - 50 <= scrollPosition) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight) {
            const lastNavLinkHref = navLinks[navLinks.length - 1].getAttribute('href');
            currentSectionId = lastNavLinkHref.substring(1);
        }
        
        navLinks.forEach(link => {
            const linkHrefId = link.getAttribute('href').substring(1);

            if (linkHrefId === currentSectionId) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
        const anyLinkIsActive = document.querySelector('nav#main_nav a.active-link');
        if (!anyLinkIsActive) {
            navLinks[0].classList.add('active-link');
        }
    };
    /*
    window.addEventListener('scroll', onScroll);
    window.addEventListener('scroll', handleNavResize);
    onScroll();
    handleNavResize();*/
    const masterScrollHandler = () => {
        handleNavResize();
        onScroll();
    };

    window.addEventListener('scroll', masterScrollHandler);
    masterScrollHandler();
});