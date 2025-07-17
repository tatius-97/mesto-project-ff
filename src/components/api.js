export { basicConfig, handleResponse, getUsersData, getInitialCards, editUsersProfile, addNewCard, deleteCard, toggleLikeCard, changeAvatar };

// Переменная идентификатора и токена для подстановки в другие запросы
const basicConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "c9b2583e-bd44-42c2-9eb6-656666c32804",
    "Content-Type": "application/json",
  },
};

// Функция проверки статуса запроса
const handleResponse = (res) => {
 if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Запрос на получение информации о пользователе
const getUsersData = () => {
  return fetch(`${basicConfig.baseUrl}/users/me`, {
        method: "GET",
        headers: basicConfig.headers,
    })
    .then(handleResponse);
};

// Запрос для на получение изначальных карточек
const getInitialCards = () => {
    return fetch(`${basicConfig.baseUrl}/cards`, {
        method: "GET",
        headers: basicConfig.headers,
    })
    .then(handleResponse);
};

// Запрос на редактированние данных пользователя
const editUsersProfile = (newName, newDescription) => {
    return fetch(`${basicConfig.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: basicConfig.headers.authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newName,
            about: newDescription,
        })
    })
    .then(handleResponse);
};

// Запрос на смену аватара пользователя
const changeAvatar = (urlAvatar) => {
    return fetch(`${basicConfig.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: basicConfig.headers.authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: `${urlAvatar}`
        })
    })
    .then(handleResponse);
};

// Запрос на добавление новой карточки
const addNewCard = (newPlace, newLink) => {
    return fetch(`${basicConfig.baseUrl}/cards`, {
        method: "POST",
        headers: {
             authorization: basicConfig.headers.authorization,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newPlace,
            link: newLink,
        })
    })
    .then(handleResponse);
};

// Запрос на удаление карточки по нажатию
const deleteCard = (cardId) => {
    return fetch(`${basicConfig.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
             authorization: basicConfig.headers.authorization
        }
    })
    .then(handleResponse);
};

// Запрос постановки лайка карточки
 const toggleLikeCard = (cardId, isLiked) => {
    return fetch(`${basicConfig.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT", // метод выбираем
        headers: {
             authorization: basicConfig.headers.authorization,
        }
    })
    .then(handleResponse);
};
