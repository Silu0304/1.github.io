//汉堡菜单
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 点击左右按钮切换图片，两组独立轮播
const boxes = document.querySelectorAll('.image-box');
boxes.forEach(box => {
    const track = box.querySelector('.slider-track');
    const prevBtn = box.querySelector('.prev');
    const nextBtn = box.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = 2;

    function updateSlide() {
        //只有两张图：0=第一张，-50%=第二张
        if(currentIndex === 0){
            track.style.transform = `translateX(0%)`;
        }else{
            track.style.transform = `translateX(-50%)`;
        }
    }

    prevBtn.addEventListener('click', ()=>{
        currentIndex = currentIndex - 1;
        if(currentIndex < 0) currentIndex = totalSlides -1;
        updateSlide();
    })

    nextBtn.addEventListener('click', ()=>{
        currentIndex = currentIndex + 1;
        if(currentIndex >= totalSlides) currentIndex = 0;
        updateSlide();
    })
})
