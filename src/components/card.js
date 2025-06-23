// Импорты из кард
import { enlargeCardImage} from "./index";

// Экспорты из кард
export { removeCard, createCard};

// Удаление карточки
function removeCard(placesItem) {
  placesItem.remove();
}

// Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active"); 
}

// Создание карточек
function createCard(card, removeNodeCallback) {
  const cardTemplate = document.querySelector("#card-template").content;
  const placesItem = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = placesItem.querySelector(".card__delete-button");
  const cardLikeButton = placesItem.querySelector(".card__like-button");
  const cardImage = placesItem.querySelector(".card__image");

  buttonRemove.addEventListener("click", function () {
    removeNodeCallback(placesItem);
  });
  cardLikeButton.addEventListener("click", likeCard); //  передали функцию лайка в обработчик аргументом в createcard

  cardImage.addEventListener("click", function () {
    enlargeCardImage(card.link, card.name); 
    });   // передали функцию обработчик клика по картинке в createcard
 
  placesItem.querySelector(".card__image").src = card.link;
  placesItem.querySelector(".card__title").textContent = card.name;
  placesItem.querySelector(".card__image").alt = card.name;

  return placesItem;
}
