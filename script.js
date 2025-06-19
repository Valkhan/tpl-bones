// T ONZE - Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initHeader();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initCountdown();
    initProductInteractions();
    initParallax();
    initGallery();
    initCadastroModal();
    initInputMasks();
});

// Header scroll effect
function initHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('gallery-grid')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animation = `fadeInUp 0.6s ease forwards`;
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Countdown timer
function initCountdown() {
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    // Set launch date (30 days from now)
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;

        if (distance < 0) {
            // Launch date reached
            document.querySelector('.countdown').innerHTML = '<h3>🚀 LANÇADO!</h3>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (countdownElements.days) countdownElements.days.textContent = String(days).padStart(2, '0');
        if (countdownElements.hours) countdownElements.hours.textContent = String(hours).padStart(2, '0');
        if (countdownElements.minutes) countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
        if (countdownElements.seconds) countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Product interactions
function initProductInteractions() {
    // Buy button interactions
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.includes('Comprar') || button.textContent.includes('Pré-venda')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
                this.style.background = '#10b981';
                
                // Add to cart animation
                this.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2500);
            });
        }
    });

    // Product image hover effects
    const heroImage = document.querySelector('.hero-product-image');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Parallax effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            // Parallax effect for hero background
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        }

        // Floating animation for product image
        const productImage = document.querySelector('.hero-product-image');
        if (productImage) {
            const translateY = Math.sin(Date.now() * 0.001) * 10;
            productImage.style.transform = `translateY(${translateY}px)`;
        }
    });
}

// Gallery interactions
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create modal effect (simplified)
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const img = document.createElement('div');
            img.style.cssText = `
                width: 80%;
                height: 80%;
                background: ${window.getComputedStyle(this).background};
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                border-radius: 20px;
            `;
            
            overlay.appendChild(img);
            document.body.appendChild(overlay);
            
            // Close on click
            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(overlay)) {
                        document.body.removeChild(overlay);
                    }
                }
            });
        });
    });
}

// Modal de cadastro functionality
function initCadastroModal() {
    const modal = document.getElementById('cadastroModal');
    const modalClose = document.getElementById('modalClose');
    const cadastroForm = document.getElementById('cadastroForm');
    
    // Botões que abrem o modal
    const triggerButtons = document.querySelectorAll('.btn-primary');
    
    // Abrir modal
    triggerButtons.forEach(button => {
        if (button.textContent.includes('Garantir') || button.textContent.includes('Pré-venda')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        }
    });
    
    // Fechar modal
    modalClose.addEventListener('click', closeModal);
    
    // Fechar modal clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Envio do formulário
    cadastroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            modal.querySelector('.modal-content').style.animation = 'slideInUp 0.4s ease';
        }, 10);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        cadastroForm.reset();
    }
    
    function handleFormSubmit() {
        const formData = new FormData(cadastroForm);
        const dados = Object.fromEntries(formData);
        
        // Simular envio (aqui você conectaria com sua API)
        const submitButton = cadastroForm.querySelector('.btn-submit');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Sucesso simulado
            submitButton.innerHTML = '<i class="fas fa-check"></i> Cadastro Realizado!';
            submitButton.style.background = '#10b981';
            
            setTimeout(() => {
                closeModal();
                showSuccessMessage();
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 2000);
            
            // Log dos dados (remover em produção)
            console.log('Dados do cadastro:', dados);
        }, 2000);
    }
    
    function showSuccessMessage() {
        // Criar notificação de sucesso
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10001;
            font-weight: 600;
            animation: slideInRight 0.5s ease;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Parabéns! Seu cadastro foi realizado com sucesso!<br>
            <small>Em breve você receberá mais informações por e-mail.</small>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 4000);
    }
}

// Máscara para telefone
function initInputMasks() {
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 7) {
                value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{2})(\d+)/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{5})(\d+)/, '$1-$2');
            }
            e.target.value = value;
        });
        
        // Buscar endereço por CEP
        cepInput.addEventListener('blur', function(e) {
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                // Aqui você pode integrar com uma API de CEP como ViaCEP
                console.log('Buscar endereço para CEP:', cep);
            }
        });
    }
}

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Performance optimization - Debounced scroll
let ticking = false;

function updateOnScroll() {
    // Add any scroll-based updates here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('T ONZE Landing Page Error:', e.error);
});

// Touch device optimizations
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Optimize hover effects for touch
    document.querySelectorAll('.gallery-item, .feature-card').forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-hover');
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-hover');
            }, 300);
        });
    });
}
