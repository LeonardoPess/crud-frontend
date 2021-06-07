import initLogin from './modules/login.js';
import initAdicionar from './modules/adicionar.js';
import initListar from './modules/listar.js';
import initEditar from './modules/editar.js';

const url = window.location.pathname;

if (url === '/tindin/' || url === '/tindin/index.html') {
  initLogin();
}

if (url === '/tindin/adicionar.html') {
  initAdicionar();
}

if (url === '/tindin/aulas.html') {
  initListar();
}

if (url === '/tindin/editar.html') {
  initEditar();
}
