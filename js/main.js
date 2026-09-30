/* =========================================================
   NineCSpensaKu
   Main Script
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {

  const loading = document.getElementById("loading");
  const app = document.getElementById("app");
  const footer = document.querySelector("footer");

  const maintenance = document.getElementById("maintenance-screen");

  const maintenanceTitle =
    document.getElementById("maintenance-title");

  const maintenanceMessage =
    document.getElementById("maintenance-message");

  const maintenanceEstimated =
    document.getElementById("maintenance-estimated");


  /* =====================================================
     HELPER
  ====================================================== */

  function hideLoading() {

    if (!loading) return;

    loading.style.opacity = "0";
    loading.style.pointerEvents = "none";

    setTimeout(() => {
      loading.remove();
    }, 450);

  }


  function enableMaintenance(data) {

    if (!maintenance) return;

    const settings = data.maintenance || {};

    if (maintenanceTitle) {
      maintenanceTitle.textContent =
        settings.title ||
        "NineCSpensaKu sedang diperbarui";
    }

    if (maintenanceMessage) {
      maintenanceMessage.textContent =
        settings.message ||
        "Kami sedang menyiapkan sesuatu yang baru untuk galaxy 9C ✨";
    }

    if (maintenanceEstimated) {
      maintenanceEstimated.textContent =
        settings.estimated ||
        "Please come back soon.";
    }


    /* Hide website */

    if (app) {
      app.style.display = "none";
    }

    if (footer) {
      footer.style.display = "none";
    }


    /* Show maintenance */

    maintenance.classList.add("active");

    document.body.classList.add("maintenance-active");

  }


  /* =====================================================
     LOAD SETTINGS
  ====================================================== */

  try {

    const response = await fetch(
      `config/settings.json?v=${Date.now()}`,
      {
        cache: "no-store"
      }
    );


    if (!response.ok) {
      throw new Error(
        "settings.json tidak ditemukan."
      );
    }


    const data = await response.json();


    /* ===================================================
       WEBSITE TITLE
    ==================================================== */

    if (data.website?.title) {
      document.title = data.website.title;
    }


    /* ===================================================
       MAINTENANCE MODE
    ==================================================== */

    if (data.maintenance?.enabled === true) {

      console.log(
        "🛠️ NineCSpensaKu Maintenance Mode: ON"
      );

      enableMaintenance(data);

      hideLoading();

      return;
    }


    /* ===================================================
       NORMAL WEBSITE
    ==================================================== */

    if (data.website?.description) {

      const description =
        document.querySelector(
          'meta[name="description"]'
        );

      if (description) {
        description.setAttribute(
          "content",
          data.website.description
        );
      }
    }


    /* ===================================================
       CLASS NAME
    ==================================================== */

    const schoolName =
      document.getElementById("school-name");

    if (
      schoolName &&
      data.class?.name
    ) {

      schoolName.textContent =
        data.class.name;

    }


    /* ===================================================
       SOCIAL LINKS
    ==================================================== */

    const socialLinks =
      document.querySelectorAll(
        'a[href*="linktr.ee"]'
      );


    if (data.links?.linktree) {

      socialLinks.forEach(link => {

        link.href =
          data.links.linktree;

      });

    }


    /* ===================================================
       COUNTDOWN
    ==================================================== */

    startCountdown("2027-05-01T00:00:00");


    /* ===================================================
       SCROLL REVEAL
    ==================================================== */

    setupReveal();


  } catch (error) {

    console.error(
      "NineCSpensaKu Error:",
      error
    );


    /*
      Kalau settings gagal dibaca,
      website tetap bisa terbuka.
    */

  } finally {

    /*
      INI PENTING.

      Apapun yang terjadi,
      loading TETAP DIHAPUS.
      Jadi tidak akan stuck di "..."
    */

    hideLoading();

  }

});


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown(targetDate) {

  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }


  function updateCountdown() {

    const target =
      new Date(targetDate).getTime();

    const now =
      new Date().getTime();

    const distance =
      target - now;


    if (distance <= 0) {

      daysElement.textContent = "0";
      hoursElement.textContent = "0";
      minutesElement.textContent = "0";
      secondsElement.textContent = "0";

      return;
    }


    const days =
      Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
      );


    const hours =
      Math.floor(
        (distance /
          (1000 * 60 * 60)) % 24
      );


    const minutes =
      Math.floor(
        (distance /
          (1000 * 60)) % 60
      );


    const seconds =
      Math.floor(
        (distance / 1000) % 60
      );


    daysElement.textContent =
      days;

    hoursElement.textContent =
      String(hours).padStart(2, "0");

    minutesElement.textContent =
      String(minutes).padStart(2, "0");

    secondsElement.textContent =
      String(seconds).padStart(2, "0");

  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function setupReveal() {

  const elements =
    document.querySelectorAll(
      ".info-card, .member-card, .memory-card, .achievement, .section-heading"
    );


  if (!elements.length) {
    return;
  }


  elements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(20px)";

    element.style.transition =
      "opacity 0.7s ease, transform 0.7s ease";

  });


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}