<script setup lang="ts">
import { useAuthStore } from '~~/stores/authStore';



const userStore = useAuthStore();
const windowWidth = useState<boolean>('windowWidth', () => true)
if (typeof window !== "undefined") {
    window.innerWidth < 1024 ? windowWidth.value = false : windowWidth.value = true; //1024 lg breakpoint
    const mediaQuery = window.matchMedia('(max-width:1024px)')
    onMounted(() => mediaQuery.addEventListener('change', onWidthChange))
    onUnmounted(() => mediaQuery.removeEventListener('change', onWidthChange))
}

const onWidthChange = () => {
    window.innerWidth < 1024 ? toggleNav.value = false : toggleNav.value = true;
    window.innerWidth < 1024 ? toggleSubNav.value = false : toggleSubNav.value = true;

}

const toggleNav = useState('toggleNav', () => windowWidth.value);
const toggleSubNav = useState('toggleSubNav', () => windowWidth.value);


const signOut = async () => {
    await magic.user.logout();
    userStore.setStateAuth(false);
    navigateTo('/');
}

</script>

<template>
    <nav class="flex flex-wrap lg:flex-nowrap max-w-[1000px] w-full mx-auto py-5 gap-x-5">
        <button type="button"
            class="border border-slate-600 rounded text-3xl m-2 flex justify-center items-center self-center lg:hidden"
            @click="toggleNav = !toggleNav">
            <Icon name="ci:hamburger" v-if="!toggleNav" />
            <Icon name="humbleicons:times" v-else />
        </button>
        <nuxt-img src="/logo.png" alt="Logo image" :width="50" :height="100"/>
        <h1 class="text-3xl self-center">
            <NuxtLink to="/">Furniture</NuxtLink>
        </h1>
        <ul v-if="toggleNav"
            class="flex flex-col uppercase font-bold w-full lg:flex-row lg:justify-end lg:gap-x-5 lg:text-xl lg:self-center">
            <li class="border-t lg:border-none">
                <NuxtLink class="inline-block py-2 pl-1 w-full" to="/">Home</NuxtLink>
            </li>
            <li class="border-t lg:border-none">
                <NuxtLink class="inline-block py-2 pl-1 w-full" to="/services">Services</NuxtLink>
            </li>
            <li class="lg:relative">
                <div class="grid grid-cols-[1fr_40px] border-t lg:grid-cols-1 peer lg:border-none">
                    <NuxtLink class="inline-block py-2 pl-1 w-full" to="/shop">Shop</NuxtLink>
                    <button type="button" class="border-l text-2xl lg:hidden " @click="toggleSubNav = !toggleSubNav"
                        :class="toggleSubNav ? 'bg-slate-600 text-white' : ''">{{ toggleSubNav? '-': '+' }}</button>

                </div>
                <ul v-if="toggleSubNav"
                    class="shadow shadow-black lg:absolute lg:hidden lg:w-[200px] lg:peer-hover:flex lg:flex-col lg:hover:flex z-10">
                    <li class="border-t ">
                        <NuxtLink class="inline-block py-2 pl-1  w-full bg-white hover:bg-red-500 hover:text-white"
                            to="/signin" v-if="!userStore.state.authenticated">Sign in
                        </NuxtLink>
                        <a class="inline-block py-2 pl-1  w-full bg-white hover:bg-red-500 cursor-pointer hover:text-white"
                            v-else @click="signOut">Sign out
                        </a>
                    </li>
                    <li class="border-t ">
                        <NuxtLink class="inline-block py-2 pl-1  w-full bg-white hover:bg-red-500 hover:text-white"
                            to="/shop">Products
                        </NuxtLink>
                    </li>
                    <li class="border-t ">
                        <NuxtLink class="inline-block py-2 pl-1  w-full bg-white hover:bg-red-500 hover:text-white"
                            to="/shop/profile">Profile
                        </NuxtLink>
                    </li>
                    <li class="border-t ">
                        <NuxtLink class="inline-block py-2 pl-1  w-full bg-white hover:bg-red-500 hover:text-white"
                            to="/shop/cart">Cart
                        </NuxtLink>
                    </li>
                    <li class="border-t ">
                        <NuxtLink class="inline-block py-2 pl-1  w-full bg-white hover:bg-red-500 hover:text-white"
                            to="/shop/checkout">
                            Checkout
                        </NuxtLink>
                    </li>
                </ul>
            </li>
            <li class="border-t lg:border-none">
                <NuxtLink class="inline-block py-2 pl-1 w-full " to="/contact">Contact</NuxtLink>
            </li>
        </ul>
    </nav>
</template>
