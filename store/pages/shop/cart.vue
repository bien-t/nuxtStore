<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
});

interface UserCart {
  _id: string
  cart: [
    {
      product: Product
      quantity: number
      _key: string
    }
  ]
}

interface Product {
  _id: string,
  name: string,
  price: number
  photoUrl: string
}

const userCart = ref<UserCart>();

onMounted(async () => {
  const didToken = await magic.user.getIdToken();
  const { data } = await useFetch("/api/getUserCart", {
    method: "GET",
    headers: { Authorization: `Bearer ${didToken}` },
  })
  userCart.value = data.value?.api;
})

const sum = computed(() => {
  return userCart.value?.cart.reduce((total, product) => {
    return total + (product.quantity * product.product.price);
  }, 0);
})

const removeFromCart = async (productKey: string) => {
  const didToken = await magic.user.getIdToken();
  const { data } = await useFetch("/api/removeFromCart", {
    method: "POST",
    headers: { Authorization: `Bearer ${didToken}` },
    body: {
      cartId: userCart.value?._id,
      productKey: productKey
    }
  })
  userCart.value = data.value?.api;
}

const updateProductQuantity = async (productQuantity: number, productKey: string) => {
  const didToken = await magic.user.getIdToken();
  const { data } = await useFetch("/api/updateProductCart", {
    method: "POST",
    headers: { Authorization: `Bearer ${didToken}` },
    body: {
      cartId: userCart.value?._id,
      productKey: productKey,
      quantity: productQuantity
    }
  })
}

</script>

<template>
  <section class="max-w-[1000px] mx-auto px-2">
    <h2
      class="font-bold uppercase text-3xl mt-20  after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
      Cart</h2>
    <table class="w-full mt-2">
      <thead class="">
        <tr class="bg-stone-900 text-white font-bold">
          <th class="py-3">Product</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Price</th>
          <th class="text-center">Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-red-500 last:border-none" v-for="cart in userCart?.cart" :key="cart.product._id">
          <td class="sm:grid sm:grid-cols-[100px_1fr] py-4 sm:py-2">
            <nuxt-img :src="cart.product.photoUrl" :alt="`Product ${cart.product.name} miniature`"
              class=" h-[100px] object-contain hidden sm:block" width="100" />

            <NuxtLink :to="`/shop/product-${cart.product._id}`" class="sm:self-center pl-2 ">
              <span  >{{ cart.product.name }}</span>
            </NuxtLink>
          </td>
          <td class="text-center"><input type="number" name="quantity" id="quantity" :min="1"
              class="border w-14 py-2 text-center " @change="updateProductQuantity(cart.quantity, cart._key)"
              v-model="cart.quantity" /></td>
          <td class="text-center">{{ formatMoney(cart.product.price) }}</td>
          <td class="text-center">{{ formatMoney(cart.quantity * cart.product.price) }}</td>
          <td>
            <Icon name="ion:trash-outline" class="text-2xl cursor-pointer" @click="removeFromCart(cart._key)" />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-stone-900 text-white font-bold">
          <th :colspan="3" class="text-right py-2">
            Totals:
          </th>
          <td class="text-center">
            {{ formatMoney(sum ?? 0) }}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <button type="button" class="bg-red-500 text-white border rounded-lg mt-2 p-2 float-right"
      @click="() => navigateTo('checkout')">Checkout</button>

  </section>
</template>
