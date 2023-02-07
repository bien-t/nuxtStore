<script setup lang="ts">
import { useAuthStore } from '~~/stores/authStore';

const route = useRoute();
const userAuth = useAuthStore();

interface Product {
    api: [{
        _id: string
        name: string
        price: number
        photo: {
            asset: {
                metadata: {
                    dimensions: {
                        width: number
                        height: number
                    }
                }
                url: string
            }
        }
        description: string

    }]
}

const { data: product } = await useFetch<Product>("/api/getProduct", {
    method: 'POST',
    body: {
        productId: route.params.id
    }
})

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
    <div v-if="product" class="grid md:grid-cols-2 max-w-[1000px]  mx-auto">
        <nuxt-img :src="product.api[0].photo.asset.url" :alt="`${product.api[0].name} photo`"
            class="w-full max-h-[200px] md:max-h-[500px] h-full object-contain"
            :width="product.api[0].photo.asset.metadata.dimensions.width"
            :height="product.api[0].photo.asset.metadata.dimensions.height" sizes="xs:400px, md:500px"/>
        <div class="text-center self-center px-2 py-2 md:py-0">
            <h3 class="font-bold">{{ product.api[0].name }}</h3>
            <p>{{ product.api[0].description }}</p>
            <div class="flex justify-between mt-5">
                <p class="font-bold">{{ formatMoney(product.api[0].price) }}</p>

                <Icon v-if="userAuth.getAuth" name="material-symbols:add-shopping-cart-sharp"
                    class="cursor-pointer hover:text-red-500 text-3xl justify-self-end self-center"
                    :class="{ color: loading }" @click="addToCart(product!.api[0]._id)" />
            </div>
        </div>


    </div>

</template>
<style lang="css" scoped>
.color {
    color: rgb(34, 197, 94);
    transition: ease-in-out;
}
</style>