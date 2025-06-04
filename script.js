function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particlesContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }, i * 100);
    }
}

// Continuously create particles (your existing code)
setInterval(createParticles, 2000);
createParticles(); // Initial particles

// Form submission handling with JHU email validation and database connection
document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const statusMessage = document.getElementById('statusMessage');
    const submitBtn = document.querySelector('.submit-btn');
    const emailInput = document.querySelector('input[type="email"]');

    // Client-side JHU email validation
    if (!emailInput.value.endsWith('@jh.edu')) {
        statusMessage.textContent = 'Please use your JHU email address (@jh.edu)';
        statusMessage.className = 'status-message error';
        return;
    }

    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Show processing state
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    statusMessage.textContent = 'Submitting your application...';
    statusMessage.className = 'status-message';

    try {
        // Send data to backend
        const response = await fetch('http://localhost:3000/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Success state
            statusMessage.textContent = result.message;
            statusMessage.className = 'status-message success';

            submitBtn.textContent = 'Application Submitted ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #c44569, #ff6b9d)';

            // Reset form after delay
            setTimeout(() => {
                this.reset();
                statusMessage.className = 'status-message';
                statusMessage.textContent = '';
                submitBtn.textContent = 'Deploy Application';
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
            }, 3000);

        } else {
            // Error from server
            statusMessage.textContent = result.message;
            statusMessage.className = 'status-message error';

            // Reset button
            submitBtn.textContent = 'Deploy Application';
            submitBtn.disabled = false;
        }

    } catch (error) {
        console.error('Network error:', error);
        statusMessage.textContent = 'Network error. Please check your connection and try again.';
        statusMessage.className = 'status-message error';

        // Reset button
        submitBtn.textContent = 'Deploy Application';
        submitBtn.disabled = false;
    }
});


// Add form input animations
document.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateX(5px)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateX(0)';
    });
});

// FAQ functionality
const faqItems = document.querySelectorAll('.faq-item');
const searchInput = document.getElementById('searchInput');

// Toggle FAQ items
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});