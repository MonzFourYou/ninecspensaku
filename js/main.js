/* ===========================
   NineCSpensaKu
   Main Script
=========================== */


document.addEventListener("DOMContentLoaded", async () => {

    try {

        /* ======================
           LOAD CONFIG
        ====================== */

        const response = await fetch("config/settings.json");

        if (!response.ok) {
            throw new Error(
                "Gagal mengambil settings.json"
            );
        }

        const data = await response.json();



        /* ======================
           WEBSITE
        ====================== */

        if (data.website) {

            if (data.website.title) {
                document.title = data.website.title;
            }

        }



        /* ======================
           HERO
        ====================== */

        const className =
            document.getElementById("class-name");

        if (className && data.class) {

            className.textContent =
                data.class.name || "";

        }


        const schoolName =
            document.getElementById("school-name");

        if (schoolName && data.class) {

            schoolName.textContent =
                data.class.school || "";

        }


        const academicYear =
            document.getElementById("academic-year");

        if (
            academicYear &&
            data.website &&
            data.website.year
        ) {

            academicYear.textContent =
                "Academic Year " +
                data.website.year;

        }


        const motto =
            document.getElementById("motto");

        if (motto && data.class) {

            motto.textContent =
                data.class.motto || "";

        }



        /* ======================
           FOOTER
        ====================== */

        const footerText =
            document.getElementById("footer-text");

        if (
            footerText &&
            data.footer &&
            data.footer.copyright
        ) {

            footerText.textContent =
                data.footer.copyright;

        }



        /* ======================
           SOCIAL MEDIA
        ====================== */

        const openSocialMedia = () => {

            if (
                data.links &&
                data.links.linktree &&
                data.links.linktree.trim() !== ""
            ) {

                window.open(
                    data.links.linktree,
                    "_blank",
                    "noopener,noreferrer"
                );

            } else {

                alert(
                    "Linktree belum diatur."
                );

            }

        };


        /* Hero Social Button */

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


        /* Quick Access Social Button */

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



        /* ======================
           INVITATION
        ====================== */

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



        /* ======================
           SUCCESS
        ====================== */

        console.log(
            "NineCSpensaKu configuration loaded successfully."
        );


    } catch (error) {

        console.error(
            "NineCSpensaKu Error:",
            error
        );

        alert(
            "Gagal memuat konfigurasi website."
        );

    }

});



/* ===========================
   LOADING SCREEN
=========================== */

window.addEventListener("load", () => {

    const loading =
        document.getElementById("loading");


    if (!loading) {
        return;
    }


    setTimeout(() => {

        loading.style.opacity = "0";

        loading.style.pointerEvents =
            "none";


        setTimeout(() => {

            if (loading) {
                loading.remove();
            }

        }, 400);

    }, 900);

});