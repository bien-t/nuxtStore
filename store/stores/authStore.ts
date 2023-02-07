import { MagicUserMetadata } from "magic-sdk";
import { defineStore } from "pinia";



export const useAuthStore = defineStore('authStore', () => {
    const state = ref({
        user: null as MagicUserMetadata | null,
        authenticated: false
    });
    const getAuth = computed(()=>state.value.authenticated)
    function setStateUser(userData: MagicUserMetadata) {
        state.value.user = userData;
    }

    function setStateAuth(authData: boolean) {
        state.value.authenticated = authData;
    }
    return {
        state, setStateUser, setStateAuth, getAuth
    }
}

)