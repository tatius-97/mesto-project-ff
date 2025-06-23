//  Список импортов
import "../pages/index.css";
import { initialCards } from "./cards";
import { removeCard, createCard } from "./card";
import { openModal, closeModal, hangListener } from "./modal";

// Список экспортов
export { enlargeCardImage };

// Переменные галереи
const logo = new URL("../images/logo.svg", import.meta.url);
const avatar = new URL("../images/avatar.jpg", import.meta.url);
const addIcon = new URL("../images/add-icon.svg", import.meta.url);
const cardFirst = new URL("../images/card_1.jpg", import.meta.url);
const cardSecond = new URL("../images/card_2.jpg", import.meta.url);
const cardThird = new URL("../images/card_3.jpg", import.meta.url);
const buttonClose = new URL("../images/close.svg", import.meta.url);
const iconDelete = new URL("../images/delete-icon.svg", import.meta.url);
const iconEdit = new URL("../images/edit-icon.svg", import.meta.url);
const likeActive = new URL("../images/like-active.svg", import.meta.url);
const likeInactive = new URL("../images/like-inactive.svg", import.meta.url);
const interBlack = new URL(
  "../vendor/fonts/Inter-Black.woff2",
  import.meta.url
);
const interMedium = new URL(
  "../vendor/fonts/Inter-Medium.woff2",
  import.meta.url
);
const interRegular = new URL(
  "../vendor/fonts/Inter-Regular.woff2",
  import.meta.url
);

const imageList = [
  { name: "logo", link: logo },
  { name: "avatar", link: avatar },
  { name: "Add Icon", link: addIcon },
  { name: "card_1", link: cardFirst },
  { name: "card_2", link: cardSecond },
  { name: "card_3", link: cardThird },
  { name: "close", link: buttonClose },
  { name: "delete-icon", link: iconDelete },
  { name: "edit-icon", link: iconEdit },
  { name: "like-active", link: likeActive },
  { name: "like-inactive", link: likeInactive },
  { name: "Inter Black", link: interBlack },
  { name: "Inter Medium", link: interMedium },
  { name: "Inter Regular", link: interRegular },
];

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
hangListener(profilePopup);
hangListener(newCardPopup);
hangListener(imagePopup);

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

// Слушатель попап картинки
imagePopup.addEventListener("click", () => {
  openModal(imagePopup);
  closeModal(imagePopup);
});

// Функция увеличения картинки
function enlargeCardImage(cardSrc, cardName) {
  openModal(imagePopup);
  popupImageLarge.src = cardSrc;
  popupImageLarge.alt = cardName;
  popupImageCaption.textContent = cardName;
}

//  Реализуем функцию редактирования профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(profilePopup);
  formElementProfile.reset();
}

// Вынесение карточек на страницу
initialCards.forEach(function (cardData) {
  const cardNode = createCard(cardData, removeCard);
  placesList.append(cardNode);
});

// Добавление новой карточки
function createNewCard(cardElement) {
  const newCardElement = createCard(cardElement, removeCard);
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
