export {
  configValidation,
  cardAddButtonPopup,
  profileEditButtonPopup,
  editAvatarButtonPopup,
};

const configValidation = {
  formSelector: ".popup__form", //форма
  inputSelector: ".popup__input", //input
  inputErrorClass: "popup__input-error_type_", //красный бордер при ошибке
  submitButtonSelector: ".popup__button", //кнопка
  inactiveButtonClass: "popup__button_disabled", //кнопка при ошибке
  activeErrorClass: "popup__input-error_type_active", //красная подсказка
};

const cardAddButtonPopup = document.querySelector(".content__button-add"); //карточки
const profileEditButtonPopup = document.querySelector(".content__button-edit"); //user
const editAvatarButtonPopup = document.querySelector(".content__avatar"); //avatar
