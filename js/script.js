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

// CV Modal Functions
function openCVModal() {
    const modal = document.getElementById('cvModal');
    const frame = document.getElementById('cvFrame');
    frame.src = './shaukat_cv.pdf';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    const modal = document.getElementById('cvModal');
    const frame = document.getElementById('cvFrame');
    modal.style.display = 'none';
    frame.src = '';
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

    // Close modal when clicking outside
    const cvModal = document.getElementById('cvModal');
    if (cvModal) {
        cvModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCVModal();
            }
        });
    }

    // Open CV modal and load PDF
    const cvViewBtn = document.querySelector('.cv-view-btn');
    if (cvViewBtn) {
        cvViewBtn.addEventListener('click', function (event) {
            event.preventDefault();
            const cvModal = document.getElementById('cvModal');
            const cvFrame = document.getElementById('cvFrame');
            const pdfUrl = this.getAttribute('href');

            cvFrame.src = pdfUrl;
            cvModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }
});