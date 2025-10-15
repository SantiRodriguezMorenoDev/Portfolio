// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// Contact Form Submission
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    const formData = {
        nombre: document.getElementById('name').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('phone').value,
        mensaje: document.getElementById('message').value
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbypS8LBLkcCbAJlkKtFJhzylseUj0PZp1H8jzGSiN8U9SXsjPoj_kY1ftLEE8amCe12AQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        showNotification('¡Gracias por tu mensaje! Te contactaré pronto.');
        this.reset();
        
    } catch (error) {
        showNotification('Error al enviar. Intenta de nuevo.');
        console.error('Error:', error);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// ===================================
// Notification System
// ===================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff006e 0%, #e63946 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(255, 0, 110, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Append to body
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll(
        '.experience-item, .project-card, .contact-form'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Project Card Click Handler
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // You can add navigation logic here
        // For example: window.open('project-url', '_blank');
        console.log('Project card clicked');
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    
    if (footer && !footer.textContent.includes(currentYear)) {
        footer.textContent = `© ${currentYear} Santiago Rodríguez Moreno. Todos los derechos reservados.`;
    }
});

// ===================================
// Loading Animation (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Project Image Modal
// ===================================
const modal = document.createElement('div');
modal.id = 'imageModal';
modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 10000;
`;

const modalImage = document.createElement('img');
modalImage.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
`;

const closeModal = document.createElement('span');
closeModal.textContent = '×';
closeModal.style.cssText = `
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 2rem;
    color: white;
    cursor: pointer;
`;

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.appendChild(modalImage);
modal.appendChild(closeModal);
document.body.appendChild(modal);

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            modalImage.src = img.src;
            modal.style.display = 'flex';
        }
    });
});