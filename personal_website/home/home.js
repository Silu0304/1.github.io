const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', ()=>{
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link=>{
    link.addEventListener('click',()=>{
        if(window.innerWidth <=768){
            navLinks.classList.remove('active');
        }
    })
});
