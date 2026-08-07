/* ===================================
   NineCSpensaKu
   Invitation Page Script
=================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const inviteData = sessionStorage.getItem("invite");
    const collaborationData = sessionStorage.getItem("collaboration");

    if (!inviteData || !collaborationData) {

        window.location.href = "invite.html";
        return;

    }

    const invite = JSON.parse(inviteData);
    const collaboration = JSON.parse(collaborationData);

    try {

        const response = await fetch("config/status.json");
        const statusConfig = await response.json();

        // =============================
        // Header
        // =============================

        document.getElementById("class-info").textContent =
            `${invite.class} • ${invite.school}`;

        document.getElementById("description").textContent =
            collaboration.description;

        document.getElementById("school").textContent =
            invite.school;

        document.getElementById("deadline").textContent =
            collaboration.deadline || "-";

        // =============================
        // Requirements
        // =============================

        const requirementList =
            document.getElementById("requirements");

        collaboration.requirements.forEach(item => {

            const li = document.createElement("li");

            li.textContent = item;

            requirementList.appendChild(li);

        });

        // =============================
        // Status
        // =============================

        const classStatus =
            statusConfig.classes.find(c => c.class === invite.class);

        const status =
            statusConfig.statusText[classStatus.status];

        const statusCard =
            document.getElementById("status-card");

        statusCard.innerHTML = `
            <h3>${status.title}</h3>
            <p>${status.description}</p>
        `;

        if (classStatus.status === "submitted") {

            statusCard.style.background = "#2E7D32";

        }

        else if (classStatus.status === "pending") {

            statusCard.style.background = "#C62828";

        }

        else {

            statusCard.style.background = "#3949AB";

        }

        // =============================
        // Buttons
        // =============================

        document
            .getElementById("concept-button")
            .addEventListener("click", () => {

                if (collaboration.conceptLink !== "") {

                    window.open(
                        collaboration.conceptLink,
                        "_blank"
                    );

                }

            });

        document
            .getElementById("upload-button")
            .addEventListener("click", () => {

                if (collaboration.uploadLink !== "") {

                    window.open(
                        collaboration.uploadLink,
                        "_blank"
                    );

                }

            });

        document
            .getElementById("whatsapp-button")
            .addEventListener("click", () => {

                if (collaboration.whatsapp !== "") {

                    window.open(
                        "https://wa.me/" +
                        collaboration.whatsapp,
                        "_blank"
                    );

                }

            });

    }

    catch (error) {

        console.error(error);

    }

});