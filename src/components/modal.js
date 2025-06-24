// Функционал для клавиши Esc
const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

//  Функционал открытия попапа
const openModal = (modal) => {
  modal.classList.add("popup_is-opened"); // добавить класс открытия попапа
  document.addEventListener("keydown", handleEscKeyUp); // добавить слушатель на кнопку Escape
};

// Функционал закрытия попапа
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened"); // удалить класс открытия попапа
  document.removeEventListener("keydown", handleEscKeyUp); // удалить слушатель на кнопку Escape
};

// Функция для того, чтобы повесить слушатели
const hangListeners = (element) => {
  const popupCloseButton = element.querySelector(".popup__close");
  popupCloseButton.addEventListener("click", () => {
    closeModal(element);
  });

  element.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(element);
    }
  });
};

export { openModal, closeModal, hangListeners };
