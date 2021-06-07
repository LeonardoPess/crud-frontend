export default function initLogin() {
  const container = document.querySelector('[data-listar="container"]');
  const registros = document.querySelector('[data-listar="registros"]');
  const aulas = JSON.parse(localStorage.getItem('aulas')) || [];

  aulas.forEach((aula, index) => {
    const html = `
    <div onclick="location.href = 'editar.html?aula=${index}';" class="aula-single">
      <h2>${aula.nome}</h2>
      <p>${aula.descricao}</p>
      <span>Cadastrado em ${aula.data}</span>
    </div>
    `;
    container.innerHTML += html;
  });

  registros.innerHTML = (aulas.length) ? `${aulas.length} registros encontrados`
    : 'nenhum registro encontrado';
}
