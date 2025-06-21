// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) { // Verifica se os elementos existem
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Tratamento para caso de href="#" apenas
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // Fecha o menu mobile se estiver aberto e for um link simples para o topo
                if (nav && nav.classList.contains('active') && mobileMenuToggle) {
                     nav.classList.remove('active');
                     mobileMenuToggle.classList.remove('active');
                }
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (nav && nav.classList.contains('active') && mobileMenuToggle) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) { // Verifica se o header existe
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1, // Inicia a animação quando 10% do elemento está visível
        rootMargin: '0px 0px -50px 0px' // Antecipa a animação em 50px da parte inferior
    };

    const observerCallback = function(entries, observerInstance) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe cards for animation (benefit-card, specialty-card)
    const cardsToAnimate = document.querySelectorAll('.benefit-card, .specialty-card');
    cardsToAnimate.forEach(card => {
        observer.observe(card);
    });

    // WhatsApp tracking (optional)
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Track WhatsApp click event
            console.log('WhatsApp button clicked: ' + this.href);
            // You can add analytics tracking here, e.g., gtag('event', 'click', {'event_category': 'WhatsApp', 'event_label': this.href});
        });
    });

    // Lazy loading for images (se data-src for usado - não está no HTML atual, mas mantido para futuras implementações)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries, imgObserver) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src'); // Remove para não reprocessar
                    img.classList.remove('lazy'); // Se houver classe lazy
                    imgObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Add mobile menu styles dynamically
// These styles are applied when the mobile menu is active.
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 82px; /* Ajustado para altura do header (50px logo + 2*16px padding) */
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            align-items: center; /* Centralizar itens do menu */
            padding: 1rem 0; /* Ajustar padding */
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-150%); /* Iniciar mais acima para transição suave */
            opacity: 0;
            visibility: hidden;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out, visibility 0.3s ease-out;
            z-index: 999; /* Abaixo do header */
        }

        .nav.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav a { /* Estilo para links no menu mobile */
            padding: 0.8rem 1rem;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #eee;
        }
        .nav a:last-child {
            border-bottom: none;
        }

        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(styleSheet);
