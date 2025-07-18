//  Список импортов
import "../pages/index.css";
import { initialCards } from "./cards";
import { createCard } from "./card";
import { openModal, closeModal, hangListeners } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  basicConfig,
  handleResponse,
  getUsersData,
  getInitialCards,
  editUsersProfile,
  addNewCard,
  deleteCard,
  toggleLikeCard,
  changeAvatar,
} from "./api";

// Объявление переменных
const placesList = document.querySelector(".places__list");

// Переменные для секции профиля
const profilePopup = document.querySelector(".popup_type_edit"); // получили попап профиля
const profileAvatarPopup = document.querySelector(".popup_type_avatar");
const profileName = document.querySelector(".profile__title"); // получили имя пользователя в профиле
const profileJob = document.querySelector(".profile__description"); // получили описание пользователя в профиле
const profileAvatar = document.querySelector(".profile__image"); // получили класс аватара пользователя
const editButton = document.querySelector(".profile__edit-button"); // получили кнопку редактирования профиля
const formElementProfile = document.forms.editProfile; //  получили форму редактирования профиля
const nameInput = formElementProfile.elements.name; // получили элемент "имя" из формы редактирования профиля
const jobInput = formElementProfile.elements.description; // получили элемент формы "описание" в профиле
const formElementAvatar = document.forms.newAvatar; // получили форму редактирования авартара
const inputAvatar = formElementAvatar.elements.avatar; // получили элемент формы ссылки на аватар

// Переменные для секции с карточками
const newCardPopup = document.querySelector(".popup_type_new-card"); // получили попап новой карточки
const imagePopup = document.querySelector(".popup_type_image"); // получили попап - щелкнуть по картинке (с увеличением)
const popupImageLarge = document.querySelector(".popup__image"); // получили картинку в попапе
const popupImageCaption = imagePopup.querySelector(".popup__caption"); // получили подпись к картинке
const addButton = document.querySelector(".profile__add-button"); // кнопка "+"

// Переменные создания новой карточки из попапа
const formNewPlace = document.forms.newPlace;
const newPlaceName = formNewPlace.elements.placeName;
const newPlaceLink = formNewPlace.elements.link;

let userId;

// Объект валидации форм
const settingsObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Активация функции валидации
enableValidation(settingsObject);

// Функции, чтобы повесить слушатель
hangListeners(profilePopup);
hangListeners(newCardPopup);
hangListeners(imagePopup);
hangListeners(profileAvatarPopup);

//  Объект с колбэками для карточки (удаление, лайк, увеличение)
const callbacks = {
  removeNodeCallback: deleteCard,
  likeCardCallback: handleLikeState,
  enlargeCardImageCallback: enlargeCardImage,
};

// обработчик постановки лайка
function handleLikeState(cardId, userId, { cardLikeButton, likesCount }, isLiked, renderLikes) {
  toggleLikeCard(cardId, isLiked)
    .then((card) => {
      renderLikes(card, { cardLikeButton, likesCount }, userId);
    })
    .catch((err) => {
      console.log("Ошибка", err);
    });
};

// Слушатели для каждого вида попапа вешаем на кнопку
// Слушатель попапа профиля
editButton.addEventListener("click", () => {
  clearValidation(formElementProfile, settingsObject); // очищаем профиль от ошибок
  openModal(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Слушатель попапа смены аватара
profileAvatar.addEventListener("click", () => {
  formElementAvatar.reset();
  clearValidation(formElementAvatar, settingsObject); // очистка формы с аватркой от ошибок формы
  openModal(profileAvatarPopup);
});

// Слушатель попапа добавления карточки
addButton.addEventListener("click", () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, settingsObject); // очищаем форму от ошибок
  openModal(newCardPopup);
});

// Функция увеличения картинки
function enlargeCardImage({ name, link }) {
  popupImageLarge.src = link;
  popupImageLarge.alt = name;
  popupImageCaption.textContent = name;
  openModal(imagePopup);
};

//  Реализуем функцию редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  const buttonSave = formElementProfile.querySelector(".popup__button");
  const initialButtonText = buttonSave.textContent;
  buttonSave.textContent = "Сохранение...";

  editUsersProfile(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      buttonSave.textContent = initialButtonText;
    });
};

// Реализуем функцию редактирования аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatar = inputAvatar.value;

  const buttonSave = formElementAvatar.querySelector(".popup__button");
  const initialButtonText = buttonSave.textContent;
  buttonSave.textContent = "Сохранение...";

  changeAvatar(newAvatar)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(profileAvatarPopup);
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      buttonSave.textContent = initialButtonText;
    });
};

// Слушатели для отправки форм
formElementProfile.addEventListener("submit", handleFormProfileSubmit);
formElementAvatar.addEventListener("submit", handleFormAvatarSubmit);
formNewPlace.addEventListener("submit", handleFormNewCardSubmit);

// Подтвердить добавление новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const cardElement = {
    name: newPlaceName.value,
    link: newPlaceLink.value,
  };

  const buttonSave = formNewPlace.querySelector(".popup__button");
  const initialButtonText = buttonSave.textContent;
  buttonSave.textContent = "Сохранение...";

  // Добавление новой карточки
  addNewCard(cardElement.name, cardElement.link)
    .then((data) => {
      const userId = data.owner._id;
      const newCardElement = createCard(data, callbacks, userId);
      placesList.prepend(newCardElement);
       closeModal(newCardPopup);
       formNewPlace.reset();
    })
    .catch((err) => {
      console.log("Ошибка", err);
    })
    .finally(() => {
      buttonSave.textContent = initialButtonText;
    });
};

//Функция для массива промисов чтобы получить id  пользоватиеля и отобразить карточки
const promises = [getUsersData(), getInitialCards()];
Promise.all(promises)
  .then(([resultUserData, initialCards]) => {
    profileName.textContent = resultUserData.name;
    profileJob.textContent = resultUserData.about;
    profileAvatar.style.backgroundImage = `url(${resultUserData.avatar})`;
    const userId = resultUserData._id;

    // Вынесение карточек на страницу
    initialCards.forEach(function (cardData) {
      const cardNode = createCard(cardData, callbacks, userId);
      placesList.append(cardNode);
    });
  })
  .catch((err) => {
    console.log(err);
  }); 
