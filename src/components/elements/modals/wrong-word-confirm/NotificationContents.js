export const notificationContents = {
    200: {
        2: { level: "success", title: "Добавление собственного слова", message: "Слово успешно добавлено" }
    },
    400: {
        0: { level: "warning", title: "Добавление собственного слова", message: "Отправлены недопустимые данные"},
        9: { level: "error", title: "Добавление собственного слова", message: "Аккаунт с такими данными уже существует"}
    },
    500: {
        0: { level: "error", title: "Проблемы с сервером", message: "Ошибки на стороне сервера. Возможно, производятся технические работы" }
    }
}