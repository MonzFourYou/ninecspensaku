/* =====================================
   NineCSpensaKu
   Main JavaScript
===================================== */


/* =====================================
   SCROLL FUNCTION
===================================== */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================
   LOAD CONFIG
===================================== */

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response =
            await fetch("config/settings.json");

        if (!response.ok) {
            throw new Error(
                "settings.json tidak dapat dimuat."
            );
        }

        const data =
            await response.json();


        /* =================================
           WEBSITE
        ================================= */

        if (
            data.website &&
            data.website.title
        ) {

            document.title =
                data.website.title;

        }


        /* =================================
           CLASS NAME
        ================================= */

        const className =
            document.getElementById(
                "class-name"
            );

        if (
            className &&
            data.class
        ) {

            className.textContent =
                data.class.name || "";

        }


        /* =================================
           SCHOOL
        ================================= */

        const schoolName =
            document.getElementById(
                "school-name"
            );

        if (
            schoolName &&
            data.class
        ) {

            schoolName.textContent =
                data.class.school || "";

        }


        /* =================================
           ACADEMIC YEAR
        ================================= */

        const academicYear =
            document.getElementById(
                "academic-year"
            );

        if (
            academicYear &&
            data.website &&
            data.website.year
        ) {

            academicYear.textContent =
                "Academic Year " +
                data.website.year;

        }


        /* =================================
           MOTTO
        ================================= */

        const motto =
            document.getElementById(
                "motto"
            );

        if (
            motto &&
            data.class &&
            data.class.motto
        ) {

            motto.textContent =
                data.class.motto;

        }


        /* =================================
           ABOUT
        ================================= */

        const about =
            document.getElementById(
                "about"
            );

        if (
            about &&
            data.website &&
            data.website.description
        ) {

            about.textContent =
                data.website.description;

        }


        /* =================================
           FOOTER
        ================================= */

        const footerText =
            document.getElementById(
                "footer-text"
            );

        if (
            footerText &&
            data.footer &&
            data.footer.copyright
        ) {

            footerText.textContent =
                data.footer.copyright;

        }


        /* =================================
           SOCIAL MEDIA
        ================================= */

        function openSocialMedia() {

            const link =
                data.links &&
                data.links.linktree;

            if (
                link &&
                link.trim() !== ""
            ) {

                window.open(
                    link,
                    "_blank",
                    "noopener,noreferrer"
                );

            } else {

                alert(
                    "Linktree belum diatur."
                );

            }

        }


        const socialButton =
            document.getElementById(
                "social-button"
            );

        if (socialButton) {

            socialButton.addEventListener(
                "click",
                openSocialMedia
            );

        }


        const socialButtonQuick =
            document.getElementById(
                "social-button-quick"
            );

        if (socialButtonQuick) {

            socialButtonQuick.addEventListener(
                "click",
                openSocialMedia
            );

        }


        /* =================================
           INVITATION
        ================================= */

        const inviteButton =
            document.getElementById(
                "invite-button"
            );

        if (inviteButton) {

            inviteButton.addEventListener(
                "click",
                () => {

                    window.location.href =
                        "invite.html";

                }
            );

        }


        console.log(
            "NineCSpensaKu loaded successfully."
        );


    } catch (error) {

        console.error(
            "NineCSpensaKu:",
            error
        );

        /*
         * Jangan tampilkan alert error
         * agar website tetap nyaman digunakan.
         */

    }

});


/* =====================================
   GRADUATION COUNTDOWN
===================================== */

/*
   UBAH TANGGAL INI kalau tanggal
   kelulusan sudah ditentukan.
*/

const graduationDate =
    new Date("2027-05-01T00:00:00");


function updateCountdown() {

    const now =
        new Date().getTime();

    const target =
        graduationDate.getTime();

    const difference =
        target - now;


    if (difference <= 0) {

        setCountdown(
            0,
            0,
            0,
            0
        );

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );


    const seconds =
        Math.floor(
            (difference /
                1000) %
            60
        );


    setCountdown(
        days,
        hours,
        minutes,
        seconds
    );

}


function setCountdown(
    days,
    hours,
    minutes,
    seconds
) {

    const daysElement =
        document.getElementById(
            "days"
        );

    const hoursElement =
        document.getElementById(
            "hours"
        );

    const minutesElement =
        document.getElementById(
            "minutes"
        );

    const secondsElement =
        document.getElementById(
            "seconds"
        );


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(
                3,
                "0"
            );

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================
   SCROLL REVEAL
===================================== */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );


/* =====================================
   LOADING SCREEN
===================================== */

window.addEventListener(
    "load",
    () => {

        const loading =
            document.getElementById(
                "loading"
            );


        if (!loading) return;


        setTimeout(
            () => {

                loading.style.opacity =
                    "0";

                loading.style.pointerEvents =
                    "none";


                setTimeout(
                    () => {

                        loading.remove();

                    },
                    400
                );

            },
            900
        );

    }
);