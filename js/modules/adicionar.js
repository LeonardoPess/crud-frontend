import validateInputs from './validateInputs.js';

export default function initAdicionar() {
  const formAdd = document.querySelector('#form-adicionar');
  const nomeAula = formAdd.querySelector('#nome');
  const descricaoAula = formAdd.querySelector('#descricao');
  const btnCancelar = formAdd.querySelector('#cancelar');
  const btnEnviar = formAdd.querySelector('#enviar');
  const inputs = [nomeAula, descricaoAula];
  const error = formAdd.querySelector('[data-error="error"]');
  const aulas = JSON.parse(localStorage.getItem('aulas')) || [];

  function getDate() {
    const dataAgora = new Date();
    const day = String(dataAgora.getDate()).padStart(2, '0');
    const month = String(dataAgora.getMonth() + 1).padStart(2, '0');
    const year = dataAgora.getFullYear();
    const date = `${day}/${month}/${year}`;
    return date;
  }

  function loading(isLoading) {
    (isLoading) ? btnEnviar.setAttribute('disabled', true) : btnEnviar.removeAttribute('disabled');
  }

  function goToAulas() {
    window.location.href = 'http://localhost/tindin/aulas.html';
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!validateInputs(inputs)) return;
      loading(true);
      aulas.push({
        nome: nomeAula.value,
        descricao: descricaoAula.value,
        data: getDate(),
      });
      localStorage.setItem('aulas', JSON.stringify(aulas));
      goToAulas();
    } catch (err) {
      error.style.display = 'block';
      error.innerHTML = err.message;
    } finally {
      loading(false);
    }
  }

  formAdd.addEventListener('submit', handleSubmit);

  function handleCancelar(event) {
    event.preventDefault();
    goToAulas();
  }

  btnCancelar.addEventListener('click', handleCancelar);
}
