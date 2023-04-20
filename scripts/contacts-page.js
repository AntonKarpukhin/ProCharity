import { ImageCropper } from "../components/ImageCropper.js";

const form = document.querySelector(".form");
const formFields = Array.from(form.querySelectorAll(".form__field"));
const dateInputs = Array.from(form.querySelectorAll(".form__input_type_date"));

const popup = document.querySelector(".popup");

const checkDataInputState = () => {
  dateInputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("form__input_hidden");
      const field = input.closest(".form__field");
      field
        .querySelector(".form__placeholder")
        .classList.remove("form__placeholder_type_is-fixed");
      field
        .querySelector(".form__input-button_type_reset")
        .classList.remove("form__input-button_active");
    }

    if (input.value !== "" && input.classList.contains("form__input_hidden")) {
      input.classList.remove("form__input_hidden");
    }
  });
};

checkDataInputState();

document.addEventListener("click", (evt) => {
  if (
    !evt.target.classList.contains("form__input_type_date") &&
    !evt.target.classList.contains("form__input_hidden")
  ) {
    checkDataInputState();
  }
  if (
    evt.target.classList.contains("form__avatar-container") ||
    evt.target.classList.contains("form__upload-new-avatar-button")
  ) {
    openLoadImagePrompt();
  }
});

const addPopupEventListeners = function () {
  const closeButton = popup.querySelector(".popup__close-button");
  const submitButton = popup.querySelector(".popup__submit-button");
  const removeButton = document.querySelector(".form__avatar-remove-button");
  const replaceButton = document.querySelector(
    ".form__upload-new-avatar-button"
  );
  const avatarElement = document.querySelector(".form__avatar-preview");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
  submitButton.addEventListener("click", () => {
    showAvatarPreview(
      avatarElement,
      popup.image,
      imageCropper.getCroppedArea()
    );
    closePopup(popup);
    removeButton.classList.add("form__avatar-remove-button_active");
    replaceButton.classList.add("form__upload-new-avatar-button_active");
  });
  removeButton.onclick = () => {
    removeAvatar(avatarElement);
    removeButton.classList.remove("form__avatar-remove-button_active");
    replaceButton.classList.remove("form__upload-new-avatar-button_active");
  };
  replaceButton.onClick = () => {
    openLoadImagePrompt();
  };
};

addPopupEventListeners();

formFields.forEach((field) => {
  const helpButton = field.querySelector(".form__input-button_type_help");

  field.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("form__input-button_type_reset")) {
      field.querySelector(".form__input").value = "";
      field
        .querySelector(".form__placeholder_type_is-fixed")
        .classList.remove("form__placeholder_type_is-fixed");
      field
        .querySelector(".form__input-button_type_reset")
        .classList.remove("form__input-button_active");
    }

    if (
      evt.target.classList.contains("form__input-button_type_show-password")
    ) {
      field.querySelector(".form__input").type = "text";
      evt.target.classList.remove("form__input-button_active");
      field
        .querySelector(".form__input-button_type_hide-password")
        .classList.add("form__input-button_active");
    }

    if (
      evt.target.classList.contains("form__input-button_type_hide-password")
    ) {
      field.querySelector(".form__input").type = "password";
      evt.target.classList.remove("form__input-button_active");
      field
        .querySelector(".form__input-button_type_show-password")
        .classList.add("form__input-button_active");
    }

    if (evt.target.classList.contains("form__dropdown-button")) {
      evt.target.classList.toggle("form__dropdown-button_active");
      field
        .querySelector(".form__dropdown-list")
        .classList.toggle("form__dropdown-list_active");
    }

    checkDataInputState();

    if (evt.target.classList.contains("form__input_hidden")) {
      evt.target.classList.remove("form__input_hidden");
    }
  });

  if (helpButton) {
    helpButton.addEventListener("click", () => {
      field
        .querySelector(".form__balloon")
        .classList.toggle("form__balloon_active");
    });

    helpButton.addEventListener("mouseenter", () => {
      field
        .querySelector(".form__balloon")
        .classList.add("form__balloon_active");
    });

    helpButton.addEventListener("mouseleave", () => {
      field
        .querySelector(".form__balloon")
        .classList.remove("form__balloon_active");
    });
  }
});

form.addEventListener("change", () => {
  formFields.forEach((field) => {
    const input = field.querySelector(".form__input");
    const placeholder = field.querySelector(".form__placeholder");
    const fixedPlaceholder = field.querySelector(
      ".form__placeholder_type_is-fixed"
    );
    const resetInputButton = field.querySelector(
      ".form__input-button_type_reset"
    );

    if (
      placeholder &&
      input.value &&
      input.type !== "checkbox" &&
      input.type !== "radio"
    ) {
      placeholder.classList.add("form__placeholder_type_is-fixed");
    }

    if (
      resetInputButton &&
      input.value &&
      input.type !== "checkbox" &&
      input.type !== "radio" &&
      input.type !== "password"
    ) {
      resetInputButton.classList.add("form__input-button_active");
    }

    if (fixedPlaceholder && !input.value) {
      placeholder.classList.remove("form__placeholder_type_is-fixed");
    }

    if (
      resetInputButton &&
      resetInputButton.classList.contains("form__input-button_active") &&
      !input.value
    ) {
      resetInputButton.classList.remove("form__input-button_active");
    }

    checkDataInputState();
  });
});

const openLoadImagePrompt = function () {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = (evt) => {
    const file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      var content = readerEvent.target.result;
      openImageCropPopup(content);
    };
  };
  input.click();
};

const openImageCropPopup = function (image) {
  popup.image = image;
  popup.classList.add("popup_visible");
  const popupImageElement = popup.querySelector(".popup__image");
  popupImageElement.src = image;
};

const closePopup = function (popup) {
  popup.classList.remove("popup_visible");
};

const showAvatarPreview = function (
  avatarElement,
  image,
  { x, y, width, height }
) {
  avatarElement.classList.add("form__avatar-preview_active");
  const posX = (avatarElement.clientWidth * parseInt(x)) / 100;
  const posY = (avatarElement.clientHeight * parseInt(y)) / 100;
  avatarElement.style.backgroundImage = `url(${image})`;
  avatarElement.style.backgroundPosition = `${posX}px ${posY}px`;
  avatarElement.style.backgroundSize = `${width} auto`;
};

const removeAvatar = function (avatarElement) {
  avatarElement.classList.remove("form__avatar-preview_active");
};

const imageCropper = new ImageCropper({
  containerClass: ".image-crop",
  bracketClass: ".image-crop__bracket",
  overlayClass: ".image-crop__overlay",
  handleLeftClass: ".image-crop__handle_direction_left",
  handleRightClass: ".image-crop__handle_direction_right",
  handleUpClass: ".image-crop__handle_direction_up",
  handleDownClass: ".image-crop__handle_direction_down",
});
