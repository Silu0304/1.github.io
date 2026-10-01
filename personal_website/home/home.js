/* =========================================================
   HOME PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE HOME SCENE
   Center the wide scene when the page first opens.
========================================================= */

const homeHero = document.querySelector(".hero");


function centerMobileHomeScene() {

    if (!homeHero) return;

    if (window.innerWidth > 768) return;

    const sceneWidth = 1100;

    const maxScroll =
        Math.max(
            0,
            sceneWidth - homeHero.clientWidth
        );

    homeHero.scrollLeft =
        maxScroll / 2;
}


window.addEventListener(
    "load",
    centerMobileHomeScene
);


window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth <= 768
        ) {
            centerMobileHomeScene();
        }

    }
);


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    menuBtn.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                navLinks.classList.toggle(
                    "active"
                );

            }

        }
    );


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth <= 768
                        ) {

                            navLinks.classList.remove(
                                "active"
                            );

                        }

                    }
                );

            }
        );

}


/* =========================================================
   DAY / NIGHT THEME
========================================================= */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "night-mode"
            );


            if (
                document.body.classList.contains(
                    "night-mode"
                )
            ) {

                themeToggle.textContent = "☾";

            } else {

                themeToggle.textContent = "☀";

            }

        }
    );

}


/* =========================================================
   STARS
========================================================= */

const starsContainer =
    document.querySelector(
        ".stars"
    );


if (starsContainer) {

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );

        star.className = "star";

        star.style.left =
            `${Math.random() * 100}%`;

        star.style.top =
            `${Math.random() * 100}%`;

        star.style.animationDelay =
            `${Math.random() * 2}s`;

        starsContainer.appendChild(
            star
        );

    }

}


/* =========================================================
   PETALS
========================================================= */

const petalsContainer =
    document.querySelector(
        ".petals"
    );


if (petalsContainer) {

    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const petal =
            document.createElement(
                "span"
            );

        petal.className = "petal";

        petal.style.left =
            `${Math.random() * 100}%`;

        petal.style.animationDuration =
            `${5 + Math.random() * 6}s`;

        petal.style.animationDelay =
            `${Math.random() * 6}s`;

        petalsContainer.appendChild(
            petal
        );

    }

}


/* =========================================================
   SPARKLE BURST
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const sparkle =
            document.createElement(
                "span"
            );

        sparkle.className =
            "sparkle";

        sparkle.style.left =
            `${event.clientX}px`;

        sparkle.style.top =
            `${event.clientY}px`;


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            20 +
            Math.random() * 35;


        sparkle.style.setProperty(
            "--tx",
            `${Math.cos(angle) * distance}px`
        );

        sparkle.style.setProperty(
            "--ty",
            `${Math.sin(angle) * distance}px`
        );


        document.body.appendChild(
            sparkle
        );


        setTimeout(
            () => {
                sparkle.remove();
            },
            800
        );

    }
);