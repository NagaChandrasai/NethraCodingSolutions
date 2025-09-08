// ============================
// Navbar Hamburger Menu Toggle
// ============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("active");
  });

  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
    }
  });
}

// ============================
// Contact Form Submission to Google Sheets
// ============================
const scriptURL = "https://script.google.com/macros/s/AKfycbw7Q2CbzQywcsr8HPQZRRhVz2D_2EQgHetfbmYEkbaRwDxvvjLxJhXeNeYDYKzDXrqt/exec"; // Replace with your deployed Apps Script URL
const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("responseMsg");
const spinner = document.getElementById("spinner");
const submitBtn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Disable button + show spinner
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    spinner.style.display = "block";
    responseMsg.textContent = "";

    const formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
      .then((res) => res.json())
      .then(() => {
        responseMsg.textContent = "✅ Thank you! We’ll contact you soon.";
        responseMsg.style.color = "green";
        form.reset();
      })
      .catch((error) => {
        responseMsg.textContent = "❌ Something went wrong. Please try again.";
        responseMsg.style.color = "red";
        console.error("Error!", error.message);
      })
      .finally(() => {
        // Re-enable button + hide spinner
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
        spinner.style.display = "none";
      });
  });
}
