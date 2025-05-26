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

    // Continuously create particles
    setInterval(createParticles, 2000);
    createParticles(); // Initial particles

    // Form submission handling with JHU email validation
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const statusMessage = document.getElementById('statusMessage');
        const submitBtn = document.querySelector('.submit-btn');
        const emailInput = document.querySelector('input[type="email"]');
        
        // Validate JHU email
        if (!emailInput.value.endsWith('@jh.edu')) {
            statusMessage.textContent = 'Please use your JHU email address (@jh.edu)';
            statusMessage.className = 'status-message error';
            return;
        }
        
        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would send the data to your backend
        // Example: fetch('/submit-form', { method: 'POST', body: formData })
        
        // Simulate form processing
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            statusMessage.textContent = 'Welcome to JHU Data Science Club! You will receive a confirmation email shortly.';
            statusMessage.className = 'status-message success';
            
            submitBtn.textContent = 'Application Submitted ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #c44569, #ff6b9d)';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                statusMessage.className = 'status-message';
                statusMessage.textContent = '';
                submitBtn.textContent = 'Deploy Application';
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
            }, 3000);
        }, 2000);
    });

    // Add typing effect to subtitle
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        element.style.opacity = '1';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            const subtitle = document.querySelector('.subtitle');
            typeWriter(subtitle, '> Ready to dive into the world of data science?');
        }, 1500);
    });

    // Add smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Smooth scroll logic would go here for actual sections
        });
    });

    // Add form input animations
    document.querySelectorAll('.form-input, .form-select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });