import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { requestAsync } from "./api/api";
import { getUserData, getUserDataAsync, getUserIdAsync } from "./api/identity/identity";
import axios from "axios";
import { refreshTokenUrl } from "./api/api-urls";

const cookies = new Cookies();

export const updateTokensAsync = async (headers) => {
    const refreshToken = getRefreshToken();
    const response = await axios({
        method: "get", 
        url: refreshTokenUrl + refreshToken,
        headers: headers,
    });
    rewriteTokens(response.data.data);
}

export const isTokenExpired = ()=> {
    const accessToken = cookies.get("access-token");
    return accessToken === undefined;
}

export const isAuthenticated = () => {
    const accessToken = cookies.get("access-token");
    const refreshToken = cookies.get("refresh-token");

    if (accessToken === undefined && refreshToken === undefined) return false;
    if (!validToken(refreshToken)) return false;

    return true;
}

export async function refreshTokens(refreshToken) {
    const newTokens = await getNewToken(refreshToken);
    rewriteTokens(newTokens);
}

export async function getNewTokens (refreshToken) {
    const result = await requestAsync("get", "api.lingomq/auth/refresh-token/" + refreshToken);
    if (result.data.code === 0) rewriteTokens(result.data.data);
}

export async function getNewToken(refreshToken) {
    const result = await requestAsync("get", "api.lingomq/auth/refresh-token/" + refreshToken);
    if (result.data.code === 0) return result.data.data;
}

export const writeTokens = (tokens) => {
    let date = new Date(tokens.accessExpiredAt);
    let infDate = new Date(2028, 0, 1);
    cookies.set("access-token", tokens.accessToken, { path: "/", expires: date });
    cookies.set("refresh-token", tokens.refreshToken, { path: "/", expires: infDate });
}

function validToken(token) {
    const decodedToken = jwtDecode(token);
    const date = new Date();
    if (decodedToken.exp * 1000 < date.getTime())
        return false;
    return true;
}

export function addLastHour() {
    let currentDate = new Date();
    let dateAfterHour = new Date();
    dateAfterHour.setHours(currentDate.getHours() + 1);
    cookies.set("last-hour", currentDate, { path: "/", expires: dateAfterHour});
}

export function hasLastHour() {
    const lastHour = cookies.get("last-hour");
    return lastHour === undefined;
}

export function rewriteTokens(tokens) {
    let date = new Date(tokens.accessExpiredAt);
    let infDate = new Date(2024, 0, 1);
    cookies.set("access-token", tokens.accessToken, { path: "/", expires: date });
    cookies.set("refresh-token", tokens.refreshToken, { path: "/", expires: infDate });
}

export function clearAuthCookies() {
    cookies.remove("access-token");
    cookies.remove("refresh-token");
}

export async function getUserId() {
    const result = await getUserIdAsync();
    return result;
}

export function getAccessToken() {
    return cookies.get("access-token");
}

export function getRefreshToken() {
    return cookies.get("refresh-token");
}