function redirectToAnimation() {
    var audio = new Audio('Te Amo.mp3');
  
    // Oculta el botón y todo el texto al iniciar la reproducción del audio
    document.querySelector('.cheque').style.display = 'none';
  
    // Crea un nuevo elemento div con el nuevo texto
    var nuevoTexto = document.createElement('div');
    nuevoTexto.innerHTML = 'Gracias por todo, con cariño';
    nuevoTexto.innerHTML += '-Omar Alderete';
    nuevoTexto.style.textAlign = 'center';
    nuevoTexto.style.marginTop = '100px';
    nuevoTexto.style.display = 'none'; // Oculta el nuevo texto inicialmente
    document.body.appendChild(nuevoTexto);
  
    // Agrega el confetti al cuerpo del documento
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
    initializeConfetti();
  
    // Agrega un evento de carga para asegurarse de que el audio se cargue completamente antes de reproducirlo
    audio.addEventListener('canplaythrough', function () {
      audio.play();
    });
  
    // Muestra el texto y el confetti cuando el estado del audio cambia a 'playing'
    audio.addEventListener('playing', function () {
      nuevoTexto.style.display = 'block';
      // Muestra el confetti
      startConfettiAnimation();
    });
  }
  
  function initializeConfetti() {
    let W = window.innerWidth;
    let H = window.innerHeight;
    const canvas = document.getElementById('confettiCanvas');
    const context = canvas.getContext('2d');
    const maxConfettis = 150;
    const particles = [];
  
    const possibleColors = [
      'DodgerBlue',
      'OliveDrab',
      'Gold',
      'Pink',
      'SlateBlue',
      'LightBlue',
      'Gold',
      'Violet',
      'PaleGreen',
      'SteelBlue',
      'SandyBrown',
      'Chocolate',
      'Crimson'
    ];
  
    function randomFromTo(from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }
  
    function confettiParticle() {
      this.x = Math.random() * W; // x
      this.y = Math.random() * H - H; // y
      this.r = randomFromTo(11, 33); // radius
      this.d = Math.random() * maxConfettis + 11;
      this.color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
      this.tilt = Math.floor(Math.random() * 33) - 11;
      this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;
  
      this.draw = function () {
        context.beginPath();
        context.lineWidth = this.r / 2;
        context.strokeStyle = this.color;
        context.moveTo(this.x + this.tilt + this.r / 3, this.y);
        context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
        return context.stroke();
      };
    }
  
    function Draw() {
      const results = [];
  
      // Magical recursive functional love
      requestAnimationFrame(Draw);
  
      context.clearRect(0, 0, W, H);
  
      for (let i = 0; i < maxConfettis; i++) {
        results.push(particles[i].draw());
      }
  
      let particle = {};
      let remainingFlakes = 0;
      for (let i = 0; i < maxConfettis; i++) {
        particle = particles[i];
  
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
        particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;
  
        if (particle.y <= H) remainingFlakes++;
  
        // If a confetti has fluttered out of view,
        // bring it back to above the viewport and let it re-fall.
        if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
          particle.x = Math.random() * W;
          particle.y = -30;
          particle.tilt = Math.floor(Math.random() * 10) - 20;
        }
      }
  
      return results;
    }
  
    window.addEventListener('resize', function () {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, false);
  
    // Push new confetti objects to `particles[]`
    for (let i = 0; i < maxConfettis; i++) {
      particles.push(new confettiParticle());
    }
  
    // Initialize
    canvas.width = W;
    canvas.height = H;
    Draw();
  }
  
  function startConfettiAnimation() {
    const canvas = document.getElementById('confettiCanvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
  }
  