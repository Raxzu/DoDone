emailjs.init("yf0XKcNwD5DFijCPE");

const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("form-status");
const submitBtn = document.getElementById("submit");
const label = submitBtn.querySelector(".label");
const spinner = submitBtn.querySelector(".spinner");

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
  statusDiv.textContent = "";
}

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

  // Start loading state
  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  label.innerHTML = "Saatmine...";
  spinner.style.display = "inline-block";

  emailjs.sendForm("service_scss9cd", "template_0xmfyod", form)
    .then(() => {
      form.reset();
      submitBtn.classList.remove("loading");
      submitBtn.classList.add("success");
      label.innerHTML = "Saadetud!";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      statusDiv.style.color = "red";
      statusDiv.textContent = "Midagi läks valesti. Palun proovige uuesti.";
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
