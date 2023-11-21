import notificationManager, { getNotificationModel } from "../../../components/services/notification/notificationManager";
import { getAccessToken, getRefreshToken, getUserId, isAuthenticated, refreshTokens } from "../../authentication";
import { requestAsync } from "../api";

export const getUserData = async () => {
    await isAuthenticated();
    const token = getAccessToken();
    const result = await requestAsync("get", "api.lingomq/identity/user/info", {}, token);
    if (result.data === undefined) {
        notificationManager.addNotification(getNotificationModel(result.level, result.title, result.message));
        return { data: { data: { }}};
    }
    return result; 
}

export const updateUserInfo = async (model) => {
    const token = getAccessToken();
    const refreshToken = getRefreshToken();
    const result = await requestAsync("put", "api.lingomq/identity/user/info", model, token);
    await refreshTokens(refreshToken);
    return result;
}

export const updateUserData = async (email, phone) => {
    const userId = getUserId();
    const requestModel = {
        id: userId,
        email: email,   
        phone: phone
    };
    const token = getAccessToken();
    const refreshToken = getRefreshToken();
    const result = await requestAsync("put", "api.lingomq/identity/user", requestModel, token);
    await refreshTokens(refreshToken);
    return result;
}

export const updatePassword = async (password) => {
    const requestModel = {
        password: password
    };
    const token = getAccessToken();
    const refreshToken = getRefreshToken();
    const result = await requestAsync("put", "api.lingomq/identity/user/credentials", requestModel, token);
    await refreshTokens(refreshToken);
    return result;
}

export const removeAccount = async () => {
    const token = getAccessToken();
    const result = await requestAsync("delete", "api.lingomq/identity/user", {}, token);
    return result;
}