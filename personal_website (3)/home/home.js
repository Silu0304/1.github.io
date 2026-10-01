const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
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
}

/* =====================================================
   DAY / NIGHT THEME
   ===================================================== */

const dayNightToggle =
    document.getElementById('dayNightToggle');

function applyTheme(theme) {

    const isNight = theme === 'night';

    document.body.classList.toggle(
        'night-mode',
        isNight
    );
}


/* Load saved theme */

const savedTheme =
    localStorage.getItem('portfolio-theme') || 'day';

applyTheme(savedTheme);


/* Toggle */

if (dayNightToggle) {

    dayNightToggle.addEventListener('click', () => {

        const isNight =
            document.body.classList.toggle('night-mode');

        localStorage.setItem(
            'portfolio-theme',
            isNight ? 'night' : 'day'
        );

    });

}
/* =====================================================
   CREATE NIGHT STARS
   ===================================================== */

const starsContainer =
    document.querySelector('.night-stars');

if (starsContainer) {

    for (let i = 0; i < 42; i++) {

        const star =
            document.createElement('span');

        star.className = 'night-star';

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 3}s`;

        star.style.animationDuration =
            `${2 + Math.random() * 2.5}s`;

        starsContainer.appendChild(star);
    }

}
/* ================= Sakura Petals ================= */

const petalsContainer = document.querySelector(".petals-container");

if (petalsContainer) {

    function createPetal() {

        const petal = document.createElement("div");

        petal.className = "petal";

        petal.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 12 + 10;

        petal.style.width = size + "px";
        petal.style.height = size * 0.8 + "px";

        petal.style.animationDuration =
            (Math.random() * 6 + 8) + "s," +
            (Math.random() * 2 + 2) + "s";

        petal.style.animationDelay =
            "0s," +
            (Math.random() * 2) + "s";

        petalsContainer.appendChild(petal);

        setTimeout(() => {

            petal.remove();

        }, 15000);
    }

    for (let i = 0; i < 22; i++) {

        setTimeout(createPetal, i * 250);

    }

    setInterval(createPetal, 650);
}

/* =====================================================
   TOUCH DRAG PAN  (mobile home scene)

   Drag anywhere on the hero: the whole scene (background
   + character stickers) follows the finger horizontally,
   with inertia on release. Matches the reference video.
   Character links still work: a drag shorter than 8px is
   treated as a tap.
   ===================================================== */

(function () {

    const hero = document.querySelector('.hero');
    const wrap = document.querySelector('.hero .character-float-wrap');

    if (!hero || !wrap) return;

    const media = window.matchMedia('(max-width: 768px)');

    let tx = 0;              // current horizontal offset (<= 0)
    let dragging = false;
    let moved = false;       // true once the drag passed the tap threshold
    let startX = 0;
    let startTx = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let inertiaId = null;

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

    function minTx() {
        // wrap is wider than the hero: how far left it may go
        return Math.min(0, hero.clientWidth - wrap.offsetWidth);
    }

    function apply() {
        wrap.style.transform = `translate(${tx}px, -50%)`;
    }

    function stopInertia() {
        if (inertiaId) {
            cancelAnimationFrame(inertiaId);
            inertiaId = null;
        }
    }

    function enabled() {
        return media.matches && wrap.offsetWidth > hero.clientWidth;
    }

    hero.addEventListener('pointerdown', (e) => {

        if (!enabled()) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;

        dragging = true;
        moved = false;
        startX = e.clientX;
        startTx = tx;
        lastX = e.clientX;
        lastT = performance.now();
        velocity = 0;

        stopInertia();

    });

    hero.addEventListener('pointermove', (e) => {

        if (!dragging) return;

        const dx = e.clientX - startX;

        if (!moved && Math.abs(dx) < 8) return;   // tap threshold

        if (!moved) {
            moved = true;
            hero.setPointerCapture?.(e.pointerId);
        }

        // horizontal drag: keep the page from scrolling away
        e.preventDefault();

        tx = clamp(startTx + dx, minTx(), 0);
        apply();

        const now = performance.now();
        const dt = now - lastT;

        if (dt > 0) {
            velocity = (e.clientX - lastX) / dt;  // px per ms
        }

        lastX = e.clientX;
        lastT = now;

    }, { passive: false });

    function endDrag(e) {

        if (!dragging) return;

        dragging = false;

        if (!moved) return;   // plain tap: let the click through

        // inertia
        stopInertia();

        let v = velocity * 16;   // px per frame-ish

        function step() {

            v *= 0.94;                       // friction
            tx = clamp(tx + v, minTx(), 0);
            apply();

            const atEdge = (tx === 0 && v > 0) || (tx === minTx() && v < 0);

            if (Math.abs(v) > 0.4 && !atEdge) {
                inertiaId = requestAnimationFrame(step);
            } else {
                inertiaId = null;
            }
        }

        inertiaId = requestAnimationFrame(step);

        // swallow the click that follows a real drag
        const swallow = (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            hero.removeEventListener('click', swallow, true);
        };

        hero.addEventListener('click', swallow, true);
        setTimeout(() => hero.removeEventListener('click', swallow, true), 350);

    }

    hero.addEventListener('pointerup', endDrag);
    hero.addEventListener('pointercancel', endDrag);
    hero.addEventListener('pointerleave', endDrag);

    // Mouse wheel pans the scene horizontally, so a narrow desktop window
    // can also be browsed left/right with the wheel / trackpad (mirrors the
    // nav-bar wheel behaviour in common.js).
    hero.addEventListener('wheel', (e) => {
        if (!enabled()) return;

        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX)
            ? e.deltaY
            : e.deltaX;

        if (!delta) return;

        e.preventDefault();
        stopInertia();
        tx = clamp(tx - delta, minTx(), 0);
        apply();
    }, { passive: false });

    // Keep the scene inside bounds across rotations / resizes, and switch
    // cleanly between the desktop (CSS-centered) and mobile (JS-panned)
    // layouts. On first entry to mobile the rug is centered so the phone
    // starts on the same middle crop the desktop shows.
    let wasEnabled = false;

    function centerTx() {
        return Math.round((hero.clientWidth - wrap.offsetWidth) / 2);
    }

    function sync() {
        if (!enabled()) {
            wrap.style.transform = '';
            tx = 0;
            wasEnabled = false;
            stopInertia();
            return;
        }
        if (!wasEnabled) {
            tx = centerTx();
            wasEnabled = true;
        } else {
            tx = clamp(tx, minTx(), 0);
        }
        apply();
    }

    window.addEventListener('resize', () => requestAnimationFrame(sync));

    // Initial mobile view: center the rug on first paint.
    requestAnimationFrame(sync);

})();
/* ===== Sparkle Burst ===== */

document.querySelectorAll(".char-float").forEach(card => {

    card.addEventListener("mouseenter", (e) => {

        const rect = card.getBoundingClientRect();

        for (let i = 0; i < 10; i++) {

            const s = document.createElement("div");

            s.className = "sparkle";

            s.style.left =
                rect.left + rect.width / 2 + "px";

            s.style.top =
                rect.top + rect.height / 2 + "px";

            const angle = Math.random() * Math.PI * 2;
            const distance = 25 + Math.random() * 35;

            s.style.setProperty(
                "--dx",
                Math.cos(angle) * distance + "px"
            );

            s.style.setProperty(
                "--dy",
                Math.sin(angle) * distance + "px"
            );

            document.body.appendChild(s);

            setTimeout(() => s.remove(), 650);
        }

    });

});