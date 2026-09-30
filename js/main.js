/* =========================================================
   NineCSpensaKu
   Main Script
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

    try {

        /*
         * Tambahkan timestamp agar browser tidak memakai
         * settings.json versi lama dari cache.
         */
        const response = await fetch(
            `config/settings.json?v=${Date.now()}`,
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error("Gagal mengambil settings.json");
        }

        const data = await response.json();


        /* =================================================
           WEBSITE
        ================================================= */

        if (data.website?.title) {
            document.title = data.website.title;
        }


        /* =================================================
           MAINTENANCE MODE
        ================================================= */

        if (data.maintenance?.enabled === true) {

            console.log("🛠️ Maintenance Mode: ON");

            const maintenance =
                document.getElementById("maintenance-screen");

            const app =
                document.getElementById("app");

            const footer =
                document.querySelector("footer");

            const loading =
                document.getElementById("loading");


            /* Isi teks maintenance */

            const title =
                document.getElementById("maintenance-title");

            const message =
                document.getElementById("maintenance-message");

            const estimated =
                document.getElementById("maintenance-estimated");


            if (title) {
                title.textContent =
                    data.maintenance.title ||
                    "NineCSpensaKu sedang diperbarui";
            }

            if (message) {
                message.textContent =
                    data.maintenance.message ||
                    "Kami sedang menyiapkan sesuatu yang baru untuk galaxy 9C ✨";
            }

            if (estimated) {
                estimated.textContent =
                    data.maintenance.estimated ||
                    "Please come back soon.";
            }


            /* Tampilkan maintenance */

            if (maintenance) {
                maintenance.classList.add("active");
            }


            /* Sembunyikan website */

            if (app) {
                app.style.display = "none";
            }

            if (footer) {
                footer.style.display = "none";
            }

            if (loading) {
                loading.remove();
            }


            /*
             * STOP DI SINI.
             * Website normal tidak perlu dijalankan.
             */

            return;
        }


        /* =================================================
           NORMAL WEBSITE
        ================================================= */

        console.log("🌌 Maintenance Mode: OFF");


        /* Hero */

        const className =
            document.getElementById("class-name");

        if (className) {
            className.textContent =
                data.class?.name || "NineCSpensaku";
        }


        const schoolName =
            document.getElementById("school-name");

        if (schoolName) {
            schoolName.textContent =
                data.class?.school ||
                "SMP Negeri 1 Pangkalan Kuras";
        }


        const academicYear =
            document.getElementById("academic-year");

        if (academicYear) {
            academicYear.textContent =
                "Academic Year " +
                (data.website?.year || "2026/2027");
        }


        const motto =
            document.getElementById("motto");

        if (motto) {
            motto.textContent =
                data.class?.motto ||
                "Beyond The Stars, Together We Grow.";
        }


        /* Footer */

        const footerText =
            document.getElementById("footer-text");

        if (footerText) {
            footerText.textContent =
                data.footer?.copyright ||
                "© 2026–2027 NineCSpensaKu • All Rights Reserved";
        }


        /* =================================================
           MEDIA SOSIAL
        ================================================= */

        const socialButtons = [
            document.getElementById("social-button"),
            document.getElementById("social-button-2")
        ];


        socialButtons.forEach(button => {

            if (!button) return;

            button.addEventListener("click", () => {

                const link =
                    data.links?.linktree;

                if (link) {

                    window.open(
                        link,
                        "_blank",
                        "noopener,noreferrer"
                    );

                } else {

                    alert("Linktree belum diatur.");

                }

            });

        });


        /* =================================================
           INVITATION
        ================================================= */

        const inviteButton =
            document.getElementById("invite-button");

        if (inviteButton) {

            inviteButton.addEventListener(
                "click",
                () => {
                    window.location.href =
                        "invite.html";
                }
            );

        }


    } catch (error) {

        console.error(
            "NineCSpensaKu Error:",
            error
        );

    }

});


/* =========================================================
   LOADING SCREEN
========================================================= */

window.addEventListener("load", () => {

    const loading =
        document.getElementById("loading");

    if (!loading) return;

    setTimeout(() => {

        loading.style.opacity = "0";
        loading.style.pointerEvents = "none";

        setTimeout(() => {

            if (loading) {
                loading.remove();
            }

        }, 500);

    }, 700);

});