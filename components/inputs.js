const form = document.querySelector('.form');
const formFields = Array.from(form.querySelectorAll('.form__field'));

formFields.forEach((field) => {
  const helpButton = field.querySelector('.form__input-button_type_help');

  field.addEventListener('click', (evt) => {

    if (evt.target.classList.contains('form__input-button_type_reset')) {
      field.querySelector('.form__input').value = '';
      field.querySelector('.form__placeholder_is-fixed').classList.remove('form__placeholder_is-fixed');
      field.querySelector('.form__input-button_type_reset').classList.remove('form__input-button_type_active');
    }

    if (evt.target.classList.contains('form__input-button_type_show-password')) {
      field.querySelector('.form__input').type = 'text';
      evt.target.classList.remove('form__input-button_type_active');
      field.querySelector('.form__input-button_type_hide-password').classList.add('form__input-button_type_active');
    }

    if (evt.target.classList.contains('form__input-button_type_hide-password')) {
      field.querySelector('.form__input').type = 'password';
      evt.target.classList.remove('form__input-button_type_active');
      field.querySelector('.form__input-button_type_show-password').classList.add('form__input-button_type_active');
    }

  });

  if (helpButton) {

    helpButton.addEventListener('click', () => {
      field.querySelector('.form__balloon').classList.toggle('form__balloon_active');
    });

    helpButton.addEventListener('mouseenter', () => {
      field.querySelector('.form__balloon').classList.add('form__balloon_active');
    });

    helpButton.addEventListener('mouseleave', () => {
      field.querySelector('.form__balloon').classList.remove('form__balloon_active');
    });

  }
});

form.addEventListener('change', () => {
  formFields.forEach((field) => {
    const input = field.querySelector('.form__input');
    const placeholder = field.querySelector('.form__placeholder');
    const fixedPlaceholder = field.querySelector('.form__placeholder_is-fixed');
    const resetInputButton = field.querySelector('.form__input-button_type_reset');

    if (input.value && input.type != 'checkbox' && input.type != 'radio') {
      placeholder.classList.add('form__placeholder_is-fixed');
    }

    if (input.value && input.type != 'checkbox' && input.type != 'radio' && input.type != 'password') {
      resetInputButton.classList.add('form__input-button_type_active');
    }

    if (fixedPlaceholder && !input.value) {
      placeholder.classList.remove('form__placeholder_is-fixed');
    }

    if (resetInputButton && resetInputButton.classList.contains('form__input-button_type_active') && !input.value) {
      resetInputButton.classList.remove('form__input-button_type_active');
    }
  });
});