import { homeTemplate, projetosTemplate, cadastroTemplate } from "./templates.js";
import { validarCadastro } from "./form.js";

const main = document.querySelector("#conteudo");

function loadPage(pagina) {

  const nav = document.querySelector('#main-nav'); 
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (nav && nav.classList.contains('ativo')) {
    nav.classList.remove('ativo');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (pagina === "projetos") {
    main.innerHTML = projetosTemplate();
  } else if (pagina === "cadastro") {

    main.innerHTML = cadastroTemplate();
    
    const form = document.querySelector("#formCadastro");

    if (form) {

      form.addEventListener("submit", validarCadastro);
    }
  } else {
    main.innerHTML = homeTemplate();
  }

  main.focus(); 
}

document.querySelectorAll("[data-page]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    loadPage(e.target.dataset.page);
  });
});

loadPage("home");

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('ativo');
    });
}

const themeToggle = document.querySelector('#theme-toggle');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) {
             themeToggle.querySelector('span').textContent = '☀️'; // Ícone de Sol
             themeToggle.setAttribute('aria-label', 'Alternar para modo claro');
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeToggle) {
             themeToggle.querySelector('span').textContent = '🌙'; // Ícone de Lua
             themeToggle.setAttribute('aria-label', 'Alternar para modo escuro');
        }
    }
}

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
} else {
    applyTheme('light');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}