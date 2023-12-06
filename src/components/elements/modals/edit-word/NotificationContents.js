export const notificationContents = {
    200: {
        2: { level: "success", title: "Удаление слова", message: "Слово успешно удалено!" }
    },
    400: {
        0: { level: "warning", title: "Ошибка изменение пароля", message: "Отправлены некорректные данные"},
        1: { level: "warning", title: "Ошибка авторизации", message: "Токен доступа истек. Перезагрузите страницу"}
    },
    500: {
        0: { level: "error", title: "Проблемы с сервером", message: "Ошибки на стороне сервера. Возможно, производятся технические работы" }
    }
}