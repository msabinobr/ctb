// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Smooth hover effects
document.querySelectorAll('.benefit-card, .specialty-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// WhatsApp click tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp clicked:', this.href);
        // You can add Google Analytics or Facebook Pixel tracking here
    });
});

// FAQ Accordion

document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        // Fecha todos os outros
        document.querySelectorAll('.faq-question').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
        });
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.hidden = true;
        });
        // Abre o selecionado se não estava aberto
        if (!expanded) {
            this.setAttribute('aria-expanded', 'true');
            const answer = document.getElementById(this.getAttribute('aria-controls'));
            if (answer) answer.hidden = false;
        }
    });
});
