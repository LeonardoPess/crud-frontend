export default function validateInputs(inputs) {
  function validateForm(value) {
    if (value.length === 0) {
      return false;
    }
    return true;
  }

  const isValid = [];
  inputs.forEach((input) => {
    const error = document.querySelector(`[data-error='${input.name}']`);
    if (validateForm(input.value) === false) {
      error.style.display = 'block';
      error.innerHTML = 'Preencha um valor.';
      isValid.push(false);
    } else {
      error.style.display = 'none';
      error.innerHTML = '';
      isValid.push(true);
    }
  });

  return isValid.indexOf(false) === -1;
}
