document.addEventListener("DOMContentLoaded", function() {

    // Enhanced Typing Effect
    const roles = [
        "Computer Science Student",
        "Web Developer",
        "Data Analyst",
        "Problem Solver",
        "Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let roleElement = document.querySelector('.dynamic-role');

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; // Pause before next word
        }

        setTimeout(typeRole, typingDelay);
    }

    // Start typing effect after a delay
    setTimeout(typeRole, 1500);

    // Enhanced Profile Interactions
    const profileContainer = document.querySelector('.profile-container');
    const profileWrapper = document.querySelector('.profile-wrapper');

    // Mouse movement parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Subtle parallax on floating elements
        const floatingElements = document.querySelectorAll('.floating-code');
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            element.style.transform = `translate(${x}px, ${y - 20}px) rotate(${x * 10}deg)`;
        });

        // Subtle rotation on profile orbit
        const orbit = document.querySelector('.profile-orbit');
        if (orbit) {
            orbit.style.transform = `translate(-50%, -50%) rotate(${mouseX * 10}deg)`;
        }
    });

    // Profile hover effects
    if (profileContainer) {
        profileContainer.addEventListener('mouseenter', () => {
            profileWrapper.style.transform = 'scale(1.02)';
        });

        profileContainer.addEventListener('mouseleave', () => {
            profileWrapper.style.transform = 'scale(1)';
        });
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe floating elements
    document.querySelectorAll('.floating-code').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });

        // Magnetic effect on hover
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Social icons enhanced interactions
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 0 30px rgba(0, 176, 240, 0.6)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Dynamic background particles (subtle)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 176, 240, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float 10s linear infinite;
        `;

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay
        particle.style.animationDelay = Math.random() * 10 + 's';

        document.querySelector('.section-box').appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Add CSS for particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }

        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Performance optimization - reduce animations on low power devices
    if ('deviceMemory' in navigator && navigator.deviceMemory < 4) {
        // Reduce particle creation frequency
        clearInterval();
        setInterval(createParticle, 8000);
    }

});
    //smooth scrolling

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar-container');
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = targetWidth;
        }, 500 + index * 200); // stagger animation
    });

    // Enhanced Skill Cards Interactivity
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Add visibility animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideInUp 0.6s ease forwards`;
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Remove existing ripple
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();
            
            this.appendChild(ripple);
        });
        
        // Add tooltip effect on hover
        card.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            if (skill) {
                this.title = skill;
            }
        });
    });

    // Animate proficiency and soft skill bars on scroll
    const proficiencyBars = document.querySelectorAll('.proficiency-bar, .soft-skill-progress');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.width = width;
                }, 100);
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    proficiencyBars.forEach(bar => barObserver.observe(bar));

    const quoteItems = [
        {
            message: '“Believe me, It works on my Machine.”',
            author: '— every programmer ever'
        },
        {
            message: '“If debugging is removing bugs, then programming must be adding them.”',
            author: '— Edsger Dijkstra'
        },
        {
            message: '“Simplicity is the soul of efficiency.”',
            author: '— Austin Freeman'
        },
        {
            message: '“If it works, dont touch it”',
            author: '— every programmer ever'
        },
        {
            message: '“Programmer: A machine that turns coffee into code.”',
            author: '— Unknown'
        }
        ,{
            message: '“Algorithm: Word used by programmers when they dont want to explain what they did.”',
            author: '— Random Programmer'
        }

    ];

    let currentQuote = 0;
    const quoteMessage = document.querySelector('.interactive-message');
    const quoteAuthor = document.querySelector('.interactive-meta');

    function rotateQuote() {
        currentQuote = (currentQuote + 1) % quoteItems.length;
        if (quoteMessage) {
            quoteMessage.textContent = quoteItems[currentQuote].message;
        }
        if (quoteAuthor) {
            quoteAuthor.textContent = quoteItems[currentQuote].author;
        }
    }

    setInterval(rotateQuote, 5200);
});

// Modal for certificates
document.querySelectorAll('.cert-item').forEach(item => {
    item.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-image');
        document.getElementById('certImage').src = imageSrc;
        document.getElementById('certModal').style.display = 'block';
    });
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('certModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('certModal')) {
        document.getElementById('certModal').style.display = 'none';
    }
});




let swiper = new Swiper(".swiper-container",{
    slidesPerView:3,
    spaceBetween:30,
    grabCursor:true,
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    pagination:{
        el:".swiper-pagination",
        clickable:true,
        dynamicBullets:true
    }
});





//background//


