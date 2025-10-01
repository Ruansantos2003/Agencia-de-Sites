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
const confirmPasswordField = document.getElementById('confirmPasswordField');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
let isLogin = true;

loginBtn.addEventListener('click', () => {
  authModal.style.display = 'flex';
  showLogin();
});
closeModalBtn.addEventListener('click', () => authModal.style.display = 'none');

toggleAuthMode.addEventListener('click', () => {
  if (isLogin) showRegister();
  else showLogin();
});

function showLogin() {
  isLogin = true;
  nameField.classList.add('hidden');
  confirmPasswordField.classList.add('hidden');
  authSubmitBtn.textContent = 'Entrar';
  authTitle.textContent = 'Bem-vindo de volta 👋';
  authSubtitle.textContent = 'Faça login para continuar e acessar todos os recursos exclusivos.';
  toggleAuthMode.textContent = 'Crie agora grátis';
}

function showRegister() {
  isLogin = false;
  nameField.classList.remove('hidden');
  confirmPasswordField.classList.remove('hidden');
  authSubmitBtn.textContent = 'Registrar';
  authTitle.textContent = 'Crie sua conta 👋';
  authSubtitle.textContent = 'Preencha os campos abaixo para criar sua conta.';
  toggleAuthMode.textContent = 'Já tenho conta';
}

// Simulação de autenticação
document.getElementById('authForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;
  if (!isLogin) {
    const name = document.getElementById('authName').value;
    const confirm = document.getElementById('authConfirmPassword').value;
    if (password !== confirm) {
      alert('Senhas não conferem!');
      return;
    }
    alert(`Conta criada para ${name} (${email})`);
  } else {
    alert(`Bem-vindo de volta, ${email}`);
  }
  authModal.style.display = 'none';
});

// ===================== COUNTERS =====================
const counters = document.querySelectorAll('.num');
counters.forEach(counter => {
  const target = +counter.dataset.target;
  const increment = target / 200;

  let count = 0;
  function updateCounter() {
    count += increment;
    if (count < target) {
      counter.textContent = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  }
  updateCounter();
});

// ===================== FAQ =====================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  answer.style.display = 'none';
  question.addEventListener('click', () => {
    const isOpen = answer.style.display === 'block';
    answer.style.display = isOpen ? 'none' : 'block';
  });
});

// ===================== CAROUSEL =====================
const track = document.querySelector('.carousel-track');
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

//grafico//

// ANIMAÇÃO DE GRÁFICOS CIRCULARES
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
