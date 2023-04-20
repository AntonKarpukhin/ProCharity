const motivation = document.querySelector('.motivation');
const motivationFields = motivation.querySelectorAll('.form__textarea');
const resetButtons = motivation.querySelectorAll('.form__input-button_type_reset');
const fieldsCounters = motivation.querySelectorAll('.form__textarea-counter');
const placeholders = motivation.querySelectorAll('.form__placeholder');

function resize() {
  const el = this;
  setTimeout(function () {
    el.style.cssText = 'height:auto;';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 1);
}

function countCharacters(input, index) {
  fieldsCounters[index].textContent = `${input.value.length}/${input.getAttribute('maxlength')}`;
  if (input.value.length == 0) {
    placeholders[index].classList.remove('form__placeholder_type_is-fixed');
  }
  else if (input.value.length > 0 && !placeholders[index].classList.contains('form__placeholder_type_is-fixed')) {
    placeholders[index].classList.add('form__placeholder_type_is-fixed');
  }
}

function reset(index) {
  motivationFields[index].value = '';
  countCharacters(motivationFields[index], index);

}
motivationFields.forEach((textarea) => {
  textarea.addEventListener('input', resize);
});

motivationFields.forEach((textarea, index) => {
  textarea.addEventListener('input', () => countCharacters(textarea, index));
});

motivationFields.forEach((textarea) => {
  textarea.addEventListener('click', resize);
});

resetButtons.forEach((button, index) => {
  button.addEventListener('click', () => reset(index));
})
