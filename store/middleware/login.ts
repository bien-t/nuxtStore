import { useAuthStore } from "~~/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useAuthStore();
    if (userStore.state.authenticated===true) {
        return navigateTo('/')
    }
})