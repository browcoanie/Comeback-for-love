const story = [
      {
        title: "Un jueves por la mañana",
        text: "24 de abril... el día que el destino me llevó hasta ti. Entre la rutina y el ruido, apareció tu rostro, y el mundo, de pronto, tuvo otro color."
      },
      {
        title: "El primer latido",
        text: "Me animé a hablarte. Era apenas una chispa, pero dentro de mí sentí un incendio. Supe entonces que mi corazón ya había elegido."
      },
      {
        title: "Un salto al vacío",
        text: "18 de junio... te propuse ser mi novia. Fue poco tiempo, lo sé, pero el corazón no entiende de relojes, sólo de certezas."
      },
      {
        title: "Tormenta",
        text: "Pasamos por mareas turbulentas. Yo me cerré, herido en mi orgullo. Velé más por mí que por nosotros. Y en ese silencio, te lastimé."
      },
      {
        title: "Perdón",
        text: "Hoy lo reconozco, y desde lo más profundo te pido disculpas. No fue falta de amor, fue miedo. Y a veces el miedo viste de armadura al corazón."
      },
      {
        title: "Desnudo el alma",
        text: "Ahora me quito esa coraza. Me entrego de nuevo, con mis luces y mis sombras. Porque lo que quiero es seguir contigo, caminar a tu lado."
      },
      {
        title: "Un hogar en sombras y luz",
        text: "Construyamos juntos nuestro refugio. Entre risas, cicatrices y sueños. Un lugar donde hasta las sombras encuentren calor."
      },
      {
        title: "La pregunta",
        text: "Con todo mi corazón, te lo digo: <span class='accent romantic-quote'>te quiero Ly</span>. Y te pregunto... <span class='question-mark'>¿Quieres volver conmigo?</span>",
        isQuestion: true
      }
    ];

    const titleEl=document.getElementById('title');
    const textEl=document.getElementById('text');
    const card=document.getElementById('card');
    const bar=document.getElementById('bar');
    const nextBtn=document.getElementById('next');
    const prevBtn=document.getElementById('prev');
    const frame=document.getElementById('frame');

    let index=0;

    function createHeart() {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = '♥';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = '100%';
      document.body.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 4000);
    }

    function render(){
      const {title, text, isQuestion} = story[index];
      titleEl.textContent = title;
      textEl.innerHTML = text;
      
      // Add special effects for the final question
      if (isQuestion) {
        setTimeout(() => {
          createHeart();
        }, 1000);
        setTimeout(() => {
          createHeart();
        }, 2000);
        setTimeout(() => {
          createHeart();
        }, 3000);
      }
      
      bar.style.width = ((index+1)/story.length*100).toFixed(1)+'%';
      prevBtn.classList.toggle('ghost', index===0);
      
      if(index < story.length-1){
        nextBtn.style.display = 'inline-block';
        nextBtn.innerHTML = 'Continuar →';
      } else {
        nextBtn.style.display = 'none';
      }
      
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
    }

    function advance(dir=1){
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
      
      setTimeout(()=>{
        if(dir>0){
          if(index < story.length-1) index++;
        } else {
          index = index > 0 ? index-1 : 0;
        }
        render();
      }, 300);
    }

    // Enhanced star field
    function initStars() {
      const canvas = document.getElementById('stars');
      const ctx = canvas.getContext('2d');
      const stars = [];
      
      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      
      function createStar() {
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2
        };
      }
      
      function initializeStars() {
        stars.length = 0;
        for (let i = 0; i < 200; i++) {
          stars.push(createStar());
        }
      }
      
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
          const currentOpacity = star.opacity * twinkle;
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
          ctx.fill();
          
          // Add subtle glow for larger stars
          if (star.size > 2) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity * 0.1})`;
            ctx.fill();
          }
        });
        
        requestAnimationFrame(animate);
      }
      
      resize();
      initializeStars();
      animate();
      
      window.addEventListener('resize', () => {
        resize();
        initializeStars();
      });
    }

    // Event listeners
    nextBtn.addEventListener('click', () => advance(1));
    prevBtn.addEventListener('click', () => advance(-1));
    
    frame.addEventListener('click', (e) => {
      const isButton = e.target.closest('button');
      if (!isButton) advance(1);
    });
    
    window.addEventListener('keydown', (e) => {
      if (['Space', 'Enter'].includes(e.code)) {
        e.preventDefault();
        advance(1);
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        advance(-1);
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        advance(1);
      }
    });

    // Initialize
    initStars();
    render();