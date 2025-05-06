// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const skillCards = document.querySelectorAll('.skill-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// Contact Form Submission Success Message
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simulate sending the form data to the email service
    fetch('https://formsubmit.co/ajax/rebecca72112@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        })
    })
    .then(response => {
        if (response.ok) {
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you! Your message has been sent successfully.';
            successMessage.style.color = 'green';
            successMessage.style.marginTop = '10px';

            // Append success message to the form
            contactForm.appendChild(successMessage);

            // Clear form fields
            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            throw new Error('Failed to send the message.');
        }
    })
    .catch(error => {
        // Show error message
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Oops! Something went wrong. Please try again later.';
        errorMessage.style.color = 'red';
        errorMessage.style.marginTop = '10px';

        // Append error message to the form
        contactForm.appendChild(errorMessage);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    });
});