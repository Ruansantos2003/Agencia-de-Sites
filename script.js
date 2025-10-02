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

// Função para mostrar registro
function showRegister() {
  isLogin = false;
  nameField.classList.remove('hidden');
  phoneField.classList.remove('hidden');
  confirmPasswordField.classList.remove('hidden');
  authSubmitBtn.textContent = 'Registrar';
  authTitle.textContent = 'Crie sua conta 👋';
  authSubtitle.textContent = 'Preencha os campos abaixo para criar sua conta.';
  toggleAuthMode.textContent = 'Já tenho conta';
}

// Abrir modal
loginBtn.addEventListener('click', () => {
  authModal.style.display = 'flex';
  showLogin();
});

// Fechar modal
closeModalBtn.addEventListener('click', () => authModal.style.display = 'none');

// Alternar login/register
toggleAuthMode.addEventListener('click', () => {
  if (isLogin) showRegister();
  else showLogin();
});

// Persistência de usuário (simples)
function setUserLogged(email) {
  localStorage.setItem('loggedUser', email);
  loginBtn.style.display = 'none';
  logoutBtn.style.display = 'inline-block';
}

function logoutUser() {
  localStorage.removeItem('loggedUser');
  loginBtn.style.display = 'inline-block';
  logoutBtn.style.display = 'none';
}

// Atualiza UI ao carregar
document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem('loggedUser');
  if (user) setUserLogged(user);
  else logoutUser();
});

// Logout
logoutBtn.addEventListener('click', () => {
  logoutUser();
  alert('Você saiu da conta.');
});

// Autenticação (simulada)
document.getElementById('authForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  const password = document.getElementById('authPassword').value;

  if (isLogin) {
    // Login
    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    alert(`Bem-vindo de volta, ${email}`);
    setUserLogged(email);
    authModal.style.display = 'none';
  } else {
    // Registro
    const name = document.getElementById('authName').value;
    const phone = document.getElementById('authPhone').value;
    const confirm = document.getElementById('authConfirmPassword').value;

    if (!name || !email || !phone || !password || !confirm) {
      alert('Preencha todos os campos!');
      return;
    }

    if (password !== confirm) {
      alert('Senhas não conferem!');
      return;
    }

    alert(`Conta criada para ${name} (${email})`);
    setUserLogged(email);
    authModal.style.display = 'none';
  }
});

// Social login (simulado)
document.querySelectorAll('.social-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const provider = btn.textContent.trim();
    const fakeEmail = `${provider.toLowerCase()}@exemplo.com`;
    alert(`Logado com ${provider} (${fakeEmail})`);
    setUserLogged(fakeEmail);
    authModal.style.display = 'none';
  });
});





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
