//  Список импортов
import "../pages/index.css";
import { initialCards } from "./cards";
import { removeCard, createCard, likeCard } from "./card";
import { openModal, closeModal, hangListeners } from "./modal";

// Объявление переменных
const placesList = document.querySelector(".places__list");

// Переменные для секции профиля
const profilePopup = document.querySelector(".popup_type_edit"); // получили попап профиля
const profileName = document.querySelector(".profile__title"); // получили имя пользователя в профиле
const profileJob = document.querySelector(".profile__description"); // получили описание пользователя в профиле
const editButton = document.querySelector(".profile__edit-button"); // получили кнопку редактирования профиля
const formElementProfile = document.forms.editProfile; //  получили форму редактирования профиля
const nameInput = formElementProfile.elements.name; // получили элемент "имя" из формы редактирования профиля
const jobInput = formElementProfile.elements.description; // получили элемент формы "описание" в профиле

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

// Функции, чтобы повесить слушатель
hangListeners(profilePopup);
hangListeners(newCardPopup);
hangListeners(imagePopup);

//  Объект с колбэками для карточки (удаление, лайк, увеличение)
const callbacks = {
  removeNodeCallback: removeCard,
  likeCardCallback: likeCard,
  enlargeCardImageCallback: enlargeCardImage,
};

// Слушатели для каждого вида попапа вешаем на кнопку
// Слушатель попапа профиля
editButton.addEventListener("click", () => {
  openModal(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formElementProfile.addEventListener("submit", handleFormProfileSubmit);
});

// Слушатель попапа добавления карточки
addButton.addEventListener("click", () => {
  openModal(newCardPopup);
  formNewPlace.addEventListener("submit", handleFormNewCardSubmit);
});

// Функция увеличения картинки
function enlargeCardImage({ name, link }) {
  popupImageLarge.src = link;
  popupImageLarge.alt = name;
  popupImageCaption.textContent = name;
  openModal(imagePopup);
}

//  Реализуем функцию редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profilePopup);
}

// Вынесение карточек на страницу
initialCards.forEach(function (cardData) {
  const cardNode = createCard(cardData, callbacks);
  placesList.append(cardNode);
});

// Добавление новой карточки
function createNewCard(cardElement) {
  const newCardElement = createCard(cardElement, callbacks);
  placesList.prepend(newCardElement);
}

// Подтвердить добавление новой карточки
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();

  const newCardName = newPlaceName.value;
  const newCardSrc = newPlaceLink.value;
  createNewCard({ name: newCardName, link: newCardSrc });
  closeModal(newCardPopup);
  formNewPlace.reset();
}
