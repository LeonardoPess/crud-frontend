import validateInputs from './validateInputs.js';

export default function initEditar() {
  const formEdit = document.querySelector('#form-editar');
  const nomeAula = formEdit.querySelector('#nome');
  const descricaoAula = formEdit.querySelector('#descricao');
  const btnDelete = formEdit.querySelector('#excluir');
  const btnCancelar = formEdit.querySelector('#cancelar');
  const btnEnviar = formEdit.querySelector('#enviar');
  const inputs = [nomeAula, descricaoAula];
  const error = formEdit.querySelector('[data-error="error"]');
  const aulas = JSON.parse(localStorage.getItem('aulas'));

  function goToAulas() {
    window.location.href = 'http://localhost/tindin/aulas.html';
  }

  function getAula() {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const aula = url.searchParams.get('aula');
    return aula;
  }

  const aula = aulas[getAula()];
  if (aula === undefined) goToAulas();

  nomeAula.value = aula.nome;
  descricaoAula.value = aula.descricao;
  document.querySelector('[data-editar="nome"]').innerHTML = nomeAula.value;

  function loading(isLoading) {
    (isLoading) ? btnEnviar.setAttribute('disabled', true) : btnEnviar.removeAttribute('disabled');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!validateInputs(inputs)) return;
      loading(true);
      aula.nome = nomeAula.value;
      aula.descricao = descricaoAula.value;
      localStorage.setItem('aulas', JSON.stringify(aulas));
      goToAulas();
    } catch (err) {
      error.style.display = 'block';
      error.innerHTML = err.message;
    } finally {
      loading(false);
    }
  }

  formEdit.addEventListener('submit', handleSubmit);

  function remove() {
    aulas.splice(getAula(), 1);
    localStorage.setItem('aulas', JSON.stringify(aulas));
    goToAulas();
  }

  function handleDelete(event) {
    event.preventDefault();
    if (window.confirm(`Você tem certeza que deseja deletar a aula ${aula.nome}?`)) remove();
  }

  btnDelete.addEventListener('click', handleDelete);

  function handleCancelar(event) {
    event.preventDefault();
    goToAulas();
  }

  btnCancelar.addEventListener('click', handleCancelar);
}
