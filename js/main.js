/* ===========================
   NineCSpensaKu
   Main Script
=========================== */

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("config/settings.json");
        const data = await response.json();

        // ======================
        // Website
        // ======================

        document.title = data.website.title;

        // ======================
        // Hero
        // ======================

        document.getElementById("class-name").textContent =
            data.class.name;

        document.getElementById("school-name").textContent =
            data.class.school;

        document.getElementById("academic-year").textContent =
            "Academic Year " + data.website.year;

        document.getElementById("motto").textContent =
            data.class.motto;

        // ======================
        // Footer
        // ======================

        document.getElementById("footer-text").textContent =
            data.footer.copyright;

        // ======================
        // Media Sosial
        // ======================

        document
            .getElementById("social-button")
            .addEventListener("click", () => {

                if (data.links.linktree !== "") {

                    window.open(data.links.linktree, "_blank");

                } else {

                    alert("Linktree belum diatur.");

                }

            });

        // ======================
        // Invitation
        // ======================

        document
            .getElementById("invite-button")
            .addEventListener("click", () => {

                window.location.href = "invite.html";

            });

    } catch (error) {

        console.error(error);

        alert("Gagal memuat konfigurasi website.");

    }

});

// ===========================
// Loading Screen
// ===========================

window.addEventListener("load", () => {

    const loading = document.getElementById("loading");

    setTimeout(() => {

        loading.style.opacity = "0";

        loading.style.pointerEvents = "none";

        setTimeout(() => {

            loading.remove();

        }, 400);

    }, 900);

});