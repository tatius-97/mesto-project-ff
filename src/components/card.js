// Экспорты из кард
export { createCard };

const likeModifier = "card__like-button_is-active";

// Рисуем - убираем лайк
function renderLikes(card, { cardLikeButton, likesCount }, userId) {
  const cardIsLiked = card.likes.map((like) => like._id).includes(userId);
  cardLikeButton.classList.toggle(likeModifier, cardIsLiked);
  likesCount.textContent = card.likes.length;
};

// Создание карточек
function createCard(card, callbacksObject, userId) {
  const { removeNodeCallback, likeCardCallback, enlargeCardImageCallback } =
    callbacksObject;
  const cardTemplate = document.querySelector("#card-template").content;
  const placesItem = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonRemove = placesItem.querySelector(".card__delete-button");
  const cardLikeButton = placesItem.querySelector(".card__like-button");
  const cardImage = placesItem.querySelector(".card__image");
  const cardTitle = placesItem.querySelector(".card__title");
  const likesCount = placesItem.querySelector(".like-count"); // класс счетчика лайков

  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;

  // Если пользователь не создавал карточку - убрать кнопку корзины
  if (userId !== card.owner._id) {
   buttonRemove.remove();
  } else {
     buttonRemove.addEventListener("click", function () {
      removeNodeCallback(card._id)
          .then(() => {
           placesItem.remove();
        })
          .catch((err) => {
          console.log("Ошибка", err);
        });
    });
}

  renderLikes(card, { cardLikeButton, likesCount }, userId);

  cardLikeButton.addEventListener("click", function () {
    const isLiked = cardLikeButton.classList.contains(likeModifier);
    likeCardCallback(card._id, userId, { cardLikeButton, likesCount }, isLiked, renderLikes);
  });

  cardImage.addEventListener("click", function () {
    enlargeCardImageCallback(card);
  });

  return placesItem;
};
