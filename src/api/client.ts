import axios from "axios";

const REMOTE_BASE_URL = "https://nestmart-api-core.lovable.app";

const BASE_URL = import.meta.env.DEV ? "" : REMOTE_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const hadAuthHeader = Boolean(error.config?.headers?.Authorization);
      if (hadAuthHeader) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_role");
        localStorage.removeItem("user_id");
        const isAuthPage =
          window.location.pathname === "/login" || window.location.pathname === "/register";
        if (!isAuthPage) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Serverga ulanib bo'lmadi. Internet aloqasini yoki backend manzilini tekshiring.";
    }
    if (error.response.status === 404) {
      return "So'ralgan funksiya backend'da hali mavjud emas (404).";
    }
    if (error.response.status === 401) {
      return "Sessiya tugagan. Iltimos, qayta tizimga kiring.";
    }
    return error.response?.data?.message || error.message || "Server bilan bog'lanishda xatolik";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Noma'lum xatolik yuz berdi";
}
