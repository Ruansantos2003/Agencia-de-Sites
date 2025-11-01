// ===================== DARK MODE =====================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// ===================== YEAR =====================
document.getElementById('year').textContent = new Date().getFullYear();

// ===================== FLOAT CTA =====================
const quickQuote = document.getElementById('quickQuote');
quickQuote.addEventListener('click', () => {
  document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
});

// ===================== AUTH MODAL =====================
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const toggleAuthMode = document.getElementById('toggleAuthMode');
const nameField = document.getElementById('nameField');
const phoneField = document.getElementById('phoneField');
const confirmPasswordField = document.getElementById('confirmPasswordField');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authStatus = document.getElementById('authStatus');
let isLogin = true;

// Login/Logout UI
const logoutBtn = document.getElementById('logoutBtn');

// Função para mostrar login
function showLogin() {
  isLogin = true;
  nameField.classList.add('hidden');
  phoneField.classList.add('hidden');
  confirmPasswordField.classList.add('hidden');
  authSubmitBtn.textContent = 'Entrar';
  authTitle.textContent = 'Bem-vindo de volta 👋';
  authSubtitle.textContent = 'Entre com seu e-mail e senha ou continue com uma das opções abaixo.';
  toggleAuthMode.textContent = 'Crie agora grátis';
}



// ===================== CAROUSEL =====================
const track = document.querySelector('.carousel-track');
if (track) {
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentSlide = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    updateCarousel();
  });
  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    updateCarousel();
  });
}

// ===================== GRÁFICOS CIRCULARES =====================
document.addEventListener("DOMContentLoaded", () => {
  const charts = document.querySelectorAll('.chart');

  charts.forEach(chart => {
    let percent = chart.dataset.percent;
    let current = 0;
    let interval = setInterval(() => {
      current++;
      chart.textContent = current + '%';
      chart.style.background = `conic-gradient(#007BFF ${current * 3.6}deg, #e9ecef 0deg)`;
      if (current >= percent) clearInterval(interval);
    }, 15);
  });
});

// ===================== VALIDAÇÃO FORM CONTATO =====================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  const telefone = document.getElementById("telefone").value;

  // Remove espaços e caracteres não numéricos
  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length < 10 || numeros.length > 11) {
    e.preventDefault(); // impede envio
    alert("Por favor, insira um telefone válido com 10 ou 11 dígitos.");
    return false;
  }
});

// ===============================
// MOBILE MENU TOGGLE
// ===============================
const nav = document.querySelector("header .nav");
const logoBtn = document.querySelector("header .logo");
let mobileMenuOpen = false;

function toggleMobileMenu() {
  if (window.innerWidth <= 768) {
    nav.classList.toggle("active");
    mobileMenuOpen = !mobileMenuOpen;
  }
}

// Toggle menu ao clicar no logo ou em um botão hamburguer (pode criar um se quiser)
logoBtn.addEventListener("click", toggleMobileMenu);

// Fechar menu ao clicar em um link
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768 && mobileMenuOpen) {
      nav.classList.remove("active");
      mobileMenuOpen = false;
    }
  });
});

// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===============================
// FLOAT CTA MOBILE VISIBILITY
// ===============================
const floatCTA = document.getElementById("quickQuote");

function checkFloatCTA() {
  if (window.innerWidth <= 768) {
    floatCTA.style.display = "block";
  } else {
    floatCTA.style.display = "none";
  }
}

window.addEventListener("resize", checkFloatCTA);
window.addEventListener("load", checkFloatCTA);

// ===============================
// AOS INITIALIZATION
// ===============================
if (window.AOS) {
  AOS.init({ duration: 1000, once: true });
}

// ===== TESTIMONIAL CAROUSEL - PROFESSIONAL (FADE, ACCESSIBLE, PAUSE ON HOVER) =====
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.testimonial-track');
  const cards = Array.from(carousel.querySelectorAll('.testimonial-card'));
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const dotsContainer = carousel.querySelector('.testimonial-dots');

  let current = 0;
  let intervalId = null;
  const intervalTime = 5000;
  const total = cards.length;

  // build dots dynamically (prevents mismatch)
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      dot.setAttribute('data-index', i);
      dot.type = 'button';
      dotsContainer.appendChild(dot);
      dot.addEventListener('click', () => {
        goTo(i);
        restartAuto();
      });
    }
  }

  // update active states
  function update() {
    cards.forEach((c, i) => {
      c.classList.toggle('active', i === current);
      c.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    const dots = Array.from(dotsContainer.children);
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(i) {
    current = (i + total) % total;
    update();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // autoplay
  function startAuto() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, intervalTime);
  }
  function stopAuto() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
  }
  function restartAuto() { stopAuto(); startAuto(); }

  // keyboard support
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); restartAuto(); }
    if (e.key === 'ArrowRight') { next(); restartAuto(); }
  });

  // hover/focus pause
  carousel.addEventListener('mouseover', stopAuto);
  carousel.addEventListener('mouseout', startAuto);
  carousel.addEventListener('focusin', stopAuto);
  carousel.addEventListener('focusout', startAuto);

  // controls
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAuto(); });

  // init
  createDots();
  update();
  // start autoplay unless user prefers reduced motion
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) startAuto();
});

const cards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.carousel-dots');
let current = 0;

cards.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    current = i;
    update();
  });
  dotsContainer.appendChild(dot);
});

function restartStarAnimation() {
  const activeCard = cards[current];
  const stars = activeCard.querySelectorAll('.stars-svg stop');
  stars.forEach(star => {
    star.setAttribute('offset', '0');
    void star.offsetWidth; // reinicia
  });
}

function typeEffect(element, text) {
  element.classList.remove('typing');
  element.textContent = '';
  void element.offsetWidth;
  element.textContent = text;
  element.classList.add('typing');
}

function update() {
  cards.forEach((c, i) => {
    c.classList.toggle('active', i === current);
    c.setAttribute('aria-hidden', i === current ? 'false' : 'true');
  });

  const dots = Array.from(dotsContainer.children);
  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  const activeText = cards[current].querySelector('.testimonial-text');
  const textContent = activeText.textContent;
  typeEffect(activeText, textContent);
  restartStarAnimation();
}

setInterval(() => {
  current = (current + 1) % cards.length;
  update();
}, 6000);
update();


// ===================== FAQ INTERAÇÃO =====================
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Fecha todos os outros
      faqItems.forEach((el) => {
        if (el !== item) el.classList.remove("active");
      });

      // Alterna o atual
      item.classList.toggle("active");
    });
  });
});

// ===================== FAQ INTERAÇÃO =====================
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos
      faqItems.forEach(i => i.classList.remove('active'));

      // Abre o clicado se não estava ativo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});







