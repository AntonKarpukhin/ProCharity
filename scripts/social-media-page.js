const personalAreaButton = document.querySelector('.header__button-personal-area');
const moderationPopup = document.querySelector('.header__popup');
const closeModerationButton = document.querySelector('.notification__close-button');
const resetInputButtons = document.querySelectorAll('.form__input-button_type_reset');

personalAreaButton.addEventListener('click', () => {
  moderationPopup.classList.add('header__popup_active');
})

closeModerationButton.addEventListener('click', () => {
  moderationPopup.classList.remove('header__popup_active');
})

resetInputButtons.forEach((resetButton) => {
  resetButton.addEventListener('click', (evt) => {
    const formField = evt.target.closest('.form__field');
    formField.querySelector('.form__input').value = '';
  })
})


