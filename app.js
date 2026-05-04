emailjs.init("NKqLy5ylKZmHdmlap");

const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("form-status");
const submitBtn = document.getElementById("submit");
const label = submitBtn ? submitBtn.querySelector(".label") : null;
const spinner = submitBtn ? submitBtn.querySelector(".spinner") : null;

function showError(input, message) {
  let error = input.parentElement.querySelector(".error-msg");
  if (!error) {
    error = document.createElement("div");
    error.classList.add("error-msg");
    input.parentElement.appendChild(error);
  }
  error.textContent = message;
  error.style.display = "block";
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(el => el.remove());
  if (statusDiv) statusDiv.textContent = "";
}

if (form && submitBtn && label && spinner) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    let hasErrors = false;

    if (!form.name.checkValidity()) {
      showError(form.name, "Sisestage korrektne nimi.");
      hasErrors = true;
    }
    if (!form.phone.checkValidity()) {
      showError(form.phone, "Sisestage korrektne telefoninumber.");
      hasErrors = true;
    }
    if (!form.email.checkValidity()) {
      showError(form.email, "Sisestage korrektne email.");
      hasErrors = true;
    }
    if (!form.message.checkValidity()) {
      showError(form.message, "Sõnum ei tohi olla tühi.");
      hasErrors = true;
    }

    if (hasErrors) return;

    submitBtn.disabled = true;
    submitBtn.classList.add("loading");
    label.innerHTML = "Saatmine...";
    spinner.style.display = "inline-block";

    emailjs.sendForm("service_4vx9oob", "template_9zgohpr", form)
      .then(() => {
        form.reset();
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success");
        label.innerHTML = "Saadetud!";
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        if (statusDiv) {
          statusDiv.style.color = "red";
          statusDiv.textContent = "Midagi läks valesti. Palun proovige uuesti.";
        }
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("error");
        label.innerHTML = "Viga!";
      })
      .finally(() => {
        spinner.style.display = "none";
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove("success", "error");
          label.innerHTML = 'Saada <img src="images/Send.png" alt="">';
        }, 3000);
      });
  });
}


document.querySelectorAll(".slideshow").forEach(slideshow => {
  const images = JSON.parse(slideshow.dataset.images);
  let current = 0;

  const imgElements = images.map(src => {
    const img = document.createElement("img");
    img.src = `images/${src}`;
    slideshow.appendChild(img);
    return img;
  });

  function showSlide(index) {
    imgElements.forEach((img, i) => {
      img.classList.remove("active");
      if (i === index) img.classList.add("active");
    });
  }

  showSlide(current);

  setInterval(() => {
    current = (current + 1) % images.length;
    showSlide(current);
  }, 4000);
});

    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    hamburger.addEventListener('click', () => {
      menu.classList.toggle('show');
    });

// Get the button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.getElementById("current-year").textContent = new Date().getFullYear();

const experienceYears = document.getElementById("experience-years");
if (experienceYears) {
  const startYear = 2010; // change this to the real start year
  const currentYear = new Date().getFullYear();
  experienceYears.textContent = currentYear - startYear;
}

document.querySelectorAll(".work-gallery").forEach((gallery) => {
  const slides = gallery.querySelectorAll(".gallery-slide");
  const dots = gallery.querySelectorAll(".gallery-dot");
  const prevBtn = gallery.querySelector(".gallery-prev");
  const nextBtn = gallery.querySelector(".gallery-next");

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = "none";
    if (nextBtn) nextBtn.style.display = "none";
    const dotsWrap = gallery.querySelector(".gallery-dots");
    if (dotsWrap) dotsWrap.style.display = "none";
    showSlide(0);
    return;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const nextIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      showSlide(nextIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      showSlide(nextIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  showSlide(0);
});

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentGallerySlides = [];
  let currentLightboxIndex = 0;

  function updateLightboxImage() {
    if (!lightboxImg || !currentGallerySlides.length) return;

    const activeSlide = currentGallerySlides[currentLightboxIndex];
    lightboxImg.src = activeSlide.src;
    lightboxImg.alt = activeSlide.alt;
  }

  function openLightbox(slides, startIndex) {
    if (!lightbox || !lightboxImg || !slides.length) return;

    currentGallerySlides = Array.from(slides);
    currentLightboxIndex = startIndex;
    updateLightboxImage();
    lightbox.classList.add("active");

    const showNav = currentGallerySlides.length > 1;
    if (lightboxPrev) lightboxPrev.style.display = showNav ? "flex" : "none";
    if (lightboxNext) lightboxNext.style.display = showNav ? "flex" : "none";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
  }

  function showPrevLightboxImage() {
    if (currentGallerySlides.length <= 1) return;
    currentLightboxIndex =
      currentLightboxIndex === 0
        ? currentGallerySlides.length - 1
        : currentLightboxIndex - 1;
    updateLightboxImage();
  }

  function showNextLightboxImage() {
    if (currentGallerySlides.length <= 1) return;
    currentLightboxIndex =
      currentLightboxIndex === currentGallerySlides.length - 1
        ? 0
        : currentLightboxIndex + 1;
    updateLightboxImage();
  }

  document.querySelectorAll(".work-gallery").forEach((gallery) => {
    const slides = gallery.querySelectorAll(".gallery-slide");

    slides.forEach((img, index) => {
      img.addEventListener("click", () => {
        openLightbox(slides, index);
      });
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevLightboxImage();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextLightboxImage();
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrevLightboxImage();
    if (e.key === "ArrowRight") showNextLightboxImage();
  });
});