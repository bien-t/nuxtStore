<script setup lang="ts">
import { useAuthStore } from '~~/stores/authStore';

const { product } = defineProps<{
    product: {
        _id: string,
        name: string,
        price: number
        photoUrl: string
    }
}>()

const userAuth = useAuthStore();
const loading = ref(false);

const addToCart = async (productId: string) => {
    try {


        const didToken = await magic.user.getIdToken();
        loading.value = true;

        const { pending } = await useFetch("/api/addToCart", {
            method: "POST",
            headers: { Authorization: `Bearer ${didToken}` },
            body: {
                productId: productId
            }
        })
        loading.value = pending.value;

    } catch (error) {
        console.log('Access denied. You need to log in first.')
    }
}
</script>

<template>
    <div
        class="hover:shadow-[0px_0px_10px] hover:shadow-red-500 hover:rounded-lg grid grid-cols-1 grid-rows-[minmax(100px,200px),1fr] p-4">
        <NuxtLink :to="`/shop/product-${product._id}`"><nuxt-img :src="product.photoUrl"  :width="200"
                :alt="`${product.name} photo`" class="w-full h-full object-contain" /></NuxtLink>
        <div class="grid grid-cols-2 ">
            <div>
                <h4 class="font-bold">{{ product.name }}</h4>
                <p class="font-bold">{{ formatMoney(product.price) }}</p>
            </div>
            <Icon v-if="userAuth.getAuth" name="material-symbols:add-shopping-cart-sharp"
                class="cursor-pointer hover:text-red-500 text-3xl justify-self-end self-center  "
                :class="{ color: loading }" @click="addToCart(product._id)" />
        </div>
    </div>
</template>

<style lang="css" scoped>
.color {
    color: rgb(34, 197, 94);
    transition: ease-in-out;
}
</style>