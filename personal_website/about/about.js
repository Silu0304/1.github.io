// Mobile hamburger menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking any navigation link (better user experience)
const navItems = document.querySelectorAll('.glass-nav-item');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Only close menu on mobile screen
        if(window.innerWidth <= 768){
            navLinks.classList.remove('active');
        }
    })
})

// Close menu automatically if window resizes to desktop size
window.addEventListener('resize', () => {
    if(window.innerWidth > 768){
        navLinks.classList.remove('active');
    }
})
