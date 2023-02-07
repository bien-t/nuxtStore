import { defineStore } from "pinia";


export interface UserInfo {
    firstname: string,
    lastname: string,
    email: string,
    city: string,
    street: string,
    zipcode: string,
    phone: string,
}

interface UserCart extends UserInfo {
    cartTotal: number
}

export const useUserStore = defineStore('userStore', () => {
    const userState = ref<UserCart>();
    function setStateUser(data: [UserInfo, { cartTotal: number }]) {
        userState.value = { ...data[0], ...data[1] };
    }

    return {
        userState, setStateUser,
    }
}

)