function createParticles() {
  const particlesContainer = document.getElementById('particles'); 
  const particlesCount = 50; 

  for (let i = 0; i < particlesCount; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
      particlesContainer.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      })
    })
  }
}

setInterval(createParticles, 2000); // create particles every 2 seconds
createParticles(); // initial 

