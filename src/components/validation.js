export { enableValidation, clearValidation };

// Функция добавления стиля ошибки
const showInputError = (formElement, inputElement, errorMessage, settingsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObject.inputErrorClass); // добавили класс подчеркивания красным
  errorElement.textContent = errorMessage; // сообщение об ошибке
  errorElement.classList.add(settingsObject.errorClass); // добавили класс сообщения об ошибке
};

// Функция удаления стилей ошибки
const hideInputError = (formElement, inputElement, settingsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObject.inputErrorClass); // удалили класс подчеркивания красным
  errorElement.textContent = "";
  errorElement.classList.remove(settingsObject.errorClass); // удалили класс с ошибкой
};

// Функция проверки ошибок (formElement - сама форма, inputElement - проверяемое поле формы)
const isValid = (formElement, inputElement, settingsObject) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); //если есть ошибка - вывести кастомное сообщение
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObject); // если есть ошибка - выделить красным
  } else {
    hideInputError(formElement, inputElement, settingsObject); 
  }
};

// Функция проверки невалидности (если хотя бы одно поле невалидно)
 const hasInvalidInput = (allInputs) => {
  return allInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Функция отключения и включения кнопки сохранить 
const toggleButtonState = (allInputs, buttonElement, settingsObject) => {
  if (hasInvalidInput(allInputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settingsObject.inactiveButtonClass);
  }
};

// Функция установить слушатели всем полям формы
const setEventListeners = (formElement, settingsObject) => {
  const allInputs = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
  const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
  toggleButtonState(allInputs, buttonElement, settingsObject);

  allInputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settingsObject);
      toggleButtonState(allInputs, buttonElement, settingsObject);
    });
  });
};

// Функция добавления слушателей для всех форм
function enableValidation(settingsObject) {

  const forms = Array.from(document.querySelectorAll(settingsObject.formSelector));
  forms.forEach((formElement) => {
    setEventListeners(formElement, settingsObject);
  });
};

// Функция очистки формы
function clearValidation(formElement, settingsObject) {
    const allInputs = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
    allInputs.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settingsObject);
    });
    buttonElement.disabled = true;
    buttonElement.classList.add(settingsObject.inactiveButtonClass);
};

