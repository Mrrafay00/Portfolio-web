document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('nav a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-to-top button
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollTopButton.id = 'scrollTopBtn';
    document.body.appendChild(scrollTopButton);

    scrollTopButton.style.cssText = `
        display: none;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopButton.style.display = 'flex';
            scrollTopButton.style.alignItems = 'center';
            scrollTopButton.style.justifyContent = 'center';
            scrollTopButton.style.opacity = '1';
        } else {
            scrollTopButton.style.opacity = '0';
            setTimeout(() => { scrollTopButton.style.display = 'none'; }, 300);
        }
    });

    // Fade-in animation for sections
    const sections = document.querySelectorAll('.section');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeInObserver.observe(section);
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            if (validateForm()) {
                showSuccess();
                contactForm.reset();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError('nameError', 'Name is required');
            markInvalid(nameInput);
            isValid = false;
        } else {
            markValid(nameInput);
        }

        const emailInput = document.getElementById('email');
        if (!emailInput.value.trim()) {
            showError('emailError', 'Email is required');
            markInvalid(emailInput);
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError('emailError', 'Please enter a valid email');
            markInvalid(emailInput);
            isValid = false;
        } else {
            markValid(emailInput);
        }

        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            showError('messageError', 'Message is required');
            markInvalid(messageInput);
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            markInvalid(messageInput);
            isValid = false;
        } else {
            markValid(messageInput);
        }

        return isValid;
    }

    function showError(id, message) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = message;
        }
    }

    function markInvalid(element) {
        if (element && element.parentElement) {
            element.parentElement.classList.add('error');
            element.parentElement.classList.remove('success');
        }
    }

    function markValid(element) {
        if (element && element.parentElement) {
            element.parentElement.classList.add('success');
            element.parentElement.classList.remove('error');
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });

        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error', 'success');
        });

        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }

    function showSuccess() {
        if (successMessage) {
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Footer Current Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
