document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. FAQ Accordion Interaction
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 3. Testimonials Slider Carousel
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');

    if (track && slides.length > 0) {
        let currentIndex = 0;

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateSlider();
            });
        }

        // Auto-play slider every 7 seconds
        let autoSlide = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        }, 7000);

        // Pause auto-play when user interacts
        const pauseAuto = () => {
            clearInterval(autoSlide);
        };

        if (prevBtn) prevBtn.addEventListener('click', pauseAuto);
        if (nextBtn) nextBtn.addEventListener('click', pauseAuto);
    }

    // 4. Contact/Booking Form Submission (Demo Interceptor for all forms)
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values for visual display
            const name = form.querySelector('#name')?.value || 'Guest';
            const email = form.querySelector('#email')?.value || '';
            const phone = form.querySelector('#phone')?.value || '';
            const service = form.querySelector('#service')?.value || 'General Plumbing';
            
            // Create a clean popup feedback
            const feedback = document.createElement('div');
            feedback.style.position = 'fixed';
            feedback.style.bottom = '30px';
            feedback.style.right = '30px';
            feedback.style.backgroundColor = '#061d13';
            feedback.style.color = '#ffffff';
            feedback.style.padding = '24px';
            feedback.style.borderRadius = '12px';
            feedback.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
            feedback.style.border = '1px solid #dfffa3';
            feedback.style.zIndex = '1000';
            feedback.style.maxWidth = '380px';
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateY(20px)';
            feedback.style.transition = 'all 0.4s ease';

            feedback.innerHTML = `
                <h4 style="color: #dfffa3; margin-bottom: 8px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Estimate Request Sent!
                </h4>
                <p style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 12px;">Thank you <strong>${name}</strong>, your request for <strong>${service}</strong> has been logged in this presentation demo.</p>
                <div style="font-size: 0.8rem; opacity: 0.6; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px;">
                    Contact details: ${phone || email || 'Not provided'}
                </div>
            `;
            
            document.body.appendChild(feedback);
            
            // Fade in
            setTimeout(() => {
                feedback.style.opacity = '1';
                feedback.style.transform = 'translateY(0)';
            }, 50);

            // Clear form
            form.reset();

            // Fade out and remove
            setTimeout(() => {
                feedback.style.opacity = '0';
                feedback.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    feedback.remove();
                }, 400);
            }, 6000);
        });
    });

    // 5. Sticky Navigation Bar Backdrop on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.position = 'fixed';
                header.style.backgroundColor = 'rgba(6, 29, 19, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.position = 'absolute';
                header.style.backgroundColor = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';
            }
        });
    }

    // 6. Smooth Scroll for Hash Links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 7. ScrollSpy: Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length > 0 && navLinksList.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.scrollY + (header ? header.offsetHeight : 80) + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinksList.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});
