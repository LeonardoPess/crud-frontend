import USER_POST from './api.js';
import validateInputs from './validateInputs.js';

export default function initLogin() {
  const formLogin = document.querySelector('#form-login');
  const email = formLogin.querySelector('#email');
  const password = formLogin.querySelector('#password');
  const button = formLogin.querySelector('.button');
  const inputs = [email, password];
  const error = formLogin.querySelector('[data-error="error"]');

  function loading(isLoading) {
    (isLoading) ? button.setAttribute('disabled', true) : button.removeAttribute('disabled');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!validateInputs(inputs)) return;
      loading(true);
      const { url, options } = USER_POST({
        email: email.value,
        password: password.value,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error((response.status === 400) ? 'Email ou senha inválidos' : 'Error: response.status');
      if (response.ok) window.location.href = 'aulas.html';
    } catch (err) {
      error.style.display = 'block';
      error.innerHTML = err.message;
    } finally {
      loading(false);
    }
  }

  formLogin.addEventListener('submit', handleSubmit);
}
