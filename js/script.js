// JavaScript moved from index.html
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');

    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('active');

    // Toggle body overflow when menu is open
    if (mobileMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// CV Viewer Modal Functions
function openCVViewModal() {
    console.log('Opening CV modal...');
    const modal = document.getElementById('cvViewModal');
    const frame = document.getElementById('cvViewFrame');
    
    if (!modal) {
        console.error('CV modal not found!');
        return;
    }
    
    // Try to load PDF directly first, then fallback to Google Docs viewer
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocalhost) {
        // For local testing, just show the PDF directly
        frame.src = './shaukat_cv.pdf';
    } else {
        // For GitHub Pages or other hosting
        frame.src = 'https://docs.google.com/gview?url=https://shaukat23.github.io/main/shaukat_cv.pdf&embedded=true';
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    console.log('CV modal opened, modal display:', modal.style.display);
}

function closeCVViewModal() {
    console.log('Closing CV modal...');
    const modal = document.getElementById('cvViewModal');
    const frame = document.getElementById('cvViewFrame');
    modal.style.display = 'none';
    frame.src = '';
    document.body.style.overflow = '';
    console.log('CV modal closed');
}

// XKCD Modal Functions
let latestXkcd = null;

function openXKCDModal() {
    if (!latestXkcd) {
        console.error('XKCD data not loaded yet.');
        return;
    }
    const modal = document.getElementById('xkcdModal');
    const modalImg = document.getElementById('xkcdModalImg');
    const modalTitle = document.getElementById('xkcdModalTitle');
    const modalAlt = document.getElementById('xkcdModalAlt');

    modalImg.src = latestXkcd.img;
    modalAlt.textContent = latestXkcd.altText || latestXkcd.alt;
    modalTitle.textContent = `XKCD #${latestXkcd.num}: ${latestXkcd.title}`;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeXKCDModal() {
    const modal = document.getElementById('xkcdModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.getElementById('overlay');

        if (mobileMenu && mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(event.target) &&
            !hamburger.contains(event.target)) {
            toggleMenu();
        }
    });

    // Close contact modal when clicking outside
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeContactModal();
            }
        });
    }

    // Close CV viewer modal when clicking outside
    const cvViewModal = document.getElementById('cvViewModal');
    if (cvViewModal) {
        cvViewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCVViewModal();
            }
        });
    }

    // Ensure modal closes when clicking outside
    const xkcdModal = document.getElementById('xkcdModal');
    if (xkcdModal) {
        xkcdModal.addEventListener('click', e => {
            if (e.target === xkcdModal) closeXKCDModal();
        });
    }

    // Re-add Fade-in animation for elements on scroll
    const fadeInImages = document.querySelectorAll('.js-fade-in-image');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    fadeInImages.forEach(image => {
        observer.observe(image);
    });

    // Fetch and store latest XKCD comic using aqendo parser feed
    fetch('https://aqendo.github.io/xkcd-parser/parsed.json')
        .then(response => response.json())
        .then(jsonData => {
            const comics = Array.isArray(jsonData) ? jsonData : [jsonData];
            // Pick a random comic each time
            const randomIndex = Math.floor(Math.random() * comics.length);
            latestXkcd = comics[randomIndex];
        })
        .catch(error => console.error('Error fetching XKCD via parser feed:', error));
}); // Close the DOMContentLoaded listener