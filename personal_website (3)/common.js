/* =====================================================
   SHARED BEHAVIOURS  (all pages)
   ===================================================== */

/* Navbar: mouse wheel scrolls the pill row horizontally.
   Needed on desktop / narrow web windows where the nav
   overflows (touch devices already swipe natively).      */
(function () {

    const nav = document.querySelector('#navbar .nav-links');

    if (!nav) return;

    nav.addEventListener('wheel', (e) => {

        if (nav.scrollWidth <= nav.clientWidth + 1) return;

        e.preventDefault();

        const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX)
            ? e.deltaY
            : e.deltaX;

        nav.scrollLeft += delta;

    }, { passive: false });

})();
