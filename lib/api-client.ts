import { API_URL } from "@/config/constants";
import { refreshTokenService } from "@/services/auth-service";
import { notificationsStore } from "@/store/notifications/notifications";
import axios from "axios";

export const apiClient = axios.create({
    baseURL: `${API_URL}/v1`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;

apiClient.interceptors.response.use(
    (response) => response.data,

    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        const isAuthRoute =
            originalRequest.url?.includes('/auth/') &&
            !originalRequest.url?.includes('/auth/refresh');

        if (status === 401 && !isAuthRoute) {
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    if (!isRefreshing) {
                        isRefreshing = true;
                        await refreshTokenService();
                        isRefreshing = false;
                    }

                    return apiClient(originalRequest);
                } catch (err) {
                    isRefreshing = false;
                    return Promise.reject(err);
                }
            }

            return Promise.reject(error);
        }

        notificationsStore.getState().showNotification({
            type: 'error',
            title: 'Error',
            duration: 5000,
            message,
        });

        return Promise.reject(error);
    }
);