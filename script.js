// Find the theme button in the page.
const button = document.querySelector(".theme-toggle");
// This span holds the current Google Material Symbol name.
const icon = document.querySelector(".theme-toggle-icon");
// These contact form elements only exist on the contact page.
const contactForm = document.querySelector("#contact-form");
const contactSubmit = document.querySelector(".contact-submit");
const formStatus = document.querySelector("#form-status");
// Check if the visitor already picked a saved theme before.
const savedTheme = localStorage.getItem("theme");

// If the saved theme is dark, apply it right away when the page loads.
if (savedTheme === "dark") {
    document.body.dataset.theme = "dark";
    icon.textContent = "light_mode";
} else {
    // Light mode starts with a dark-mode icon because clicking it switches themes.
    icon.textContent = "dark_mode";
}

// Listen for clicks on the theme button.
button.addEventListener("click", () => {
    // Check whether dark mode is currently on.
    const isDark = document.body.dataset.theme === "dark";

    if (isDark) {
        // Switch back to light mode.
        document.body.dataset.theme = "light";
        localStorage.setItem("theme", "light");
        icon.textContent = "dark_mode";
    } else {
        // Switch to dark mode.
        document.body.dataset.theme = "dark";
        localStorage.setItem("theme", "dark");
        icon.textContent = "light_mode";
    }
});

if (contactForm && contactSubmit && formStatus) {
    // Submit to Formspree with fetch so the page stays on the contact screen.
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        contactSubmit.textContent = "Sending...";
        contactSubmit.disabled = true;
        formStatus.textContent = "";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                contactSubmit.textContent = "Sent ✓";
                formStatus.textContent = "Your message was sent successfully.";
                contactForm.reset();
            } else {
                contactSubmit.textContent = "Send Message";
                contactSubmit.disabled = false;
                formStatus.textContent = "There was a problem sending your message. Please try again.";
            }
        } catch (error) {
            contactSubmit.textContent = "Send Message";
            contactSubmit.disabled = false;
            formStatus.textContent = "There was a problem sending your message. Please try again.";
        }
    });
}
