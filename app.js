document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header scroll styling
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Spy and Scroll Animations
    const sections = document.querySelectorAll('section');
    const sideLinks = document.querySelectorAll('.side-nav-link');

    // Add fade-in classes to sections for Scroll-driven animations
    sections.forEach(sec => {
        sec.classList.add('fade-in-section');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Update side navigation active class
                const id = entry.target.getAttribute('id');
                sideLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Traffic Light Animation (Automatic Loop)
    const lights = {
        red: document.querySelector('.light.red'),
        yellow: document.querySelector('.light.yellow'),
        green: document.querySelector('.light.green')
    };

    let trafficState = 'red';

    function updateTrafficLights() {
        // Reset all
        Object.values(lights).forEach(l => {
            if (l) l.classList.remove('active');
        });

        if (trafficState === 'red') {
            if (lights.red) lights.red.classList.add('active');
            trafficState = 'green'; // red -> green
            setTimeout(updateTrafficLights, 4000);
        } else if (trafficState === 'green') {
            if (lights.green) lights.green.classList.add('active');
            trafficState = 'yellow'; // green -> yellow
            setTimeout(updateTrafficLights, 4000);
        } else if (trafficState === 'yellow') {
            if (lights.yellow) lights.yellow.classList.add('active');
            trafficState = 'red'; // yellow -> red
            setTimeout(updateTrafficLights, 1500);
        }
    }

    if (lights.red || lights.yellow || lights.green) {
        updateTrafficLights(); // Start loop
    }

    // 4. Form Submissions (Handbook Form)
    const handbookForm = document.querySelector('.handbook-form');
    if (handbookForm) {
        handbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = handbookForm.querySelector('button');
            const inputs = handbookForm.querySelectorAll('input');
            let valid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ff3b30';
                } else {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }
            });

            if (valid) {
                const originalText = btn.textContent;
                btn.textContent = 'DOWNLOADING...';
                btn.style.backgroundColor = '#4cd964';
                btn.style.boxShadow = '0 10px 25px rgba(76, 217, 100, 0.3)';

                setTimeout(() => {
                    alert('Success! Your free driving handbook has been sent to your email.');
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.boxShadow = '';
                    handbookForm.reset();
                }, 1500);
            }
        });
    }

    // 5. Contact Form Redirect to WhatsApp
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            // Academy WhatsApp number mapping
            const whatsappNumber = "+263773140197";
            const text = encodeURIComponent(`Hello Vasco da Gama Driving Academy!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        });
    }

    // 6. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all active items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});
