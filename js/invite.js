/* ===========================
   NineCSpensaKu
   Invitation Script
=========================== */

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("invite-id");
    const button = document.getElementById("continue-button");
    const message = document.getElementById("message");

    button.addEventListener("click", verifyInvitation);

    input.addEventListener("keypress", (event) => {

        if (event.key === "Enter") {

            verifyInvitation();

        }

    });

    async function verifyInvitation() {

        message.textContent = "";
        message.style.color = "#FF6B6B";

        const inviteId = input.value.trim();

        if (inviteId === "") {

            message.textContent = "Silakan masukkan Invitation ID.";

            return;

        }

        try {

            const response = await fetch("config/invite.json");

            const data = await response.json();

            const invite = data.invites.find(item => item.id === inviteId);

            if (!invite) {

                message.textContent = "Invitation ID tidak valid.";

                return;

            }

            sessionStorage.setItem(
                "invite",
                JSON.stringify(invite)
            );

            sessionStorage.setItem(
                "collaboration",
                JSON.stringify(data.collaboration)
            );

            window.location.href = "invitation.html";

        }

        catch (error) {

            console.error(error);

            message.textContent =
                "Gagal membaca data Invitation.";

        }

    }

});