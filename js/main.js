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
            if (window.scrollY > 50) { // Adiciona a classe se a rolagem for maior que 50px
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
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
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .specialty-card, .animated-item');
    elementsToAnimate.forEach(card => {
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
