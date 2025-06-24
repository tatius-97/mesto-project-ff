// Экспорты из кард
export { removeCard, createCard, likeCard };

// Удаление карточки
function removeCard(placesItem) {
  placesItem.remove();
}

// Лайк карточки
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Создание карточек
function createCard(card, callbacksObject) {
  const { removeNodeCallback, likeCardCallback, enlargeCardImageCallback } =
    callbacksObject;
  const cardTemplate = document.querySelector("#card-template").content;
  const placesItem = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = placesItem.querySelector(".card__delete-button");
  const cardLikeButton = placesItem.querySelector(".card__like-button");
  const cardImage = placesItem.querySelector(".card__image");
  const cardTitle = placesItem.querySelector(".card__title");

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;

  buttonRemove.addEventListener("click", function () {
    removeNodeCallback(placesItem);
  });
  cardLikeButton.addEventListener("click", function () {
    likeCardCallback(cardLikeButton);
  });

  cardImage.addEventListener("click", function () {
    enlargeCardImageCallback(card);
  });

  return placesItem;
}
