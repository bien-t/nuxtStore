<script setup lang="ts">
import { useAuthStore } from '~~/stores/authStore';
definePageMeta({
    middleware: 'login'
});
const emailState = useState<string>('emailState');
const userStore = useAuthStore();


const setEmailState = (event: Event) => {
    emailState.value = (event.target as HTMLInputElement).value
}


const submitLogin = async () => {
    await magic.auth.loginWithMagicLink({ email: emailState.value });
    const metadata = await magic.user.getMetadata();
    userStore.setStateUser(metadata);
    await useFetch("/api/createUser", {
        method: "POST",
        body: {
            email: userStore.state.user?.email
        }
    })
    userStore.setStateAuth(true);
}

watch(() => userStore.getAuth, () => {
    if (userStore.state.authenticated === true) {
        return navigateTo('/');
    }
})
</script>

<template>
    <section class="max-w-[1000px] mx-auto">
        <h2
            class="font-bold uppercase text-3xl mt-20  after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
            Sign in</h2>
        <div class="flex justify-center px-5">
            <form @submit.prevent="submitLogin"
                class="flex flex-col shadow-[0px_0px_3px] shadow-red-500 rounded-lg p-5 h-[200px] my-7">
                <div class="flex flex-wrap text-center justify-center gap-y-2">
                    <label for="email" class="w-full uppercase font-bold">Email:</label>
                    <input type="email" id="email" placeholder="Enter your email" @change="setEmailState" required
                        class="shadow-[0px_0px_3px] shadow-red-500 rounded-lg p-2" />
                </div>
                <button type="submit" class="bg-red-500 text-white border rounded-lg mt-auto self-center p-2">Sign
                    in</button>
            </form>
        </div>
    </section>
</template>
