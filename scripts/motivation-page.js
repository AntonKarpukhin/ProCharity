const motivation = document.querySelector('.motivation');
const motivationFields = motivation.querySelectorAll('.form__textarea');
const resetButtons = motivation.querySelectorAll('.form__input-button_type_reset');
const fieldsCounters = motivation.querySelectorAll('.form__textarea-counter');

function resize() {
  const el = this;
  setTimeout(function () {
    el.style.cssText = 'height:auto;';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 1);
}

function countCharacters(input, index) {
  fieldsCounters[index].textContent = `${input.value.length}/${input.getAttribute('maxlength')}`;
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

