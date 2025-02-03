import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// JavaScript for header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// JavaScript for form submission and modal
const form = document.getElementById("contactForm");
const modal = document.getElementById("successModal");
const closeBtn = document.getElementsByClassName("close")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendFormData();
  form.reset();
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function sendFormData() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const service = document.getElementById("service").value;

  const emailContent = `
New Contact Form Submission from Eco Tours Karnataka

Name: ${name}
Email: ${email}
Phone: ${phone}
Service Interest: ${service}

This message was sent from the contact form on ecotourskarnataka.com
  `.trim();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "admin@mail.ecotourskarnataka.com",
        to: ["yateesh192@gmail.com"],
        subject: "New Contact Form Submission - Eco Tours Karnataka",
        text: emailContent,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    modal.style.display = "block";
  } catch (error) {
    console.error("Error sending email:", error);
    alert("There was an error sending your message. Please try again later.");
  }
}
