emailjs.init("yf0XKcNwD5DFijCPE");

const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("form-status");

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

  emailjs.sendForm("service_scss9cd", "template_0xmfyod", form)
    .then(() => {
      statusDiv.style.color = "#A48149";
      statusDiv.textContent = "Sõnum saadetud, võtame teiega ühendust!!";
      form.reset();
    })
    .catch((error) => {
      statusDiv.style.color = "red";
      statusDiv.textContent = "Midagi läks valesti. Palun proovige uuesti.";
      console.error("EmailJS error:", error);
    });
});
