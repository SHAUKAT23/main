// Injects the navigation bar from nav.html (in tabs folder) into the element with id="navbar"
document.addEventListener('DOMContentLoaded', function() {
    fetch('nav.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                navbar.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
});
