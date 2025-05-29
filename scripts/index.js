// Объявление переменных
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// Удаление карточки
function removeCard(placesItem) {
  placesItem.remove();
}

// Создание карточек
function createCard(card, removeNodeCallback) {
  const placesItem = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = placesItem.querySelector(".card__delete-button");

  buttonRemove.addEventListener("click", function () {
    removeNodeCallback(placesItem);
  });

  placesItem.querySelector(".card__image").src = card.link;
  placesItem.querySelector(".card__title").textContent = card.name;
  placesItem.querySelector(".card__image").alt = card.name;

  return placesItem;
}

// Вынесение карточек на страницу
initialCards.forEach(function (cardData) {
  const cardNode = createCard(cardData, removeCard);
  placesList.append(cardNode);
});
