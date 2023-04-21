const headerPopup = document.querySelector(".header__popup");
const notificationCloseButton = headerPopup.querySelector(
  ".notification__close-button"
);

notificationCloseButton.onclick = () => {
  hideHeaderPopup();
};

function showHeaderPopup() {
  headerPopup.classList.add("header__popup_active");
}

function hideHeaderPopup() {
  headerPopup.classList.remove("header__popup_active");
}
