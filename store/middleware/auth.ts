import { useAuthStore } from "~~/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useAuthStore();
    const isLoggedIn = await magic.user?.isLoggedIn();
    if (isLoggedIn === false) {
        userStore.setStateAuth(false)

        return navigateTo('/signin')
    } else {
        userStore.setStateAuth(true)
    }
})