const helpButton = document.querySelector('.form__input-button_type_help');
const baloonPopup = document.querySelector('.form__balloon');

helpButton.addEventListener('click', () => {
  baloonPopup.classList.toggle('form__balloon_active');
})
