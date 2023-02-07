<script setup lang="ts">
import { UserInfo, useUserStore } from '~~/stores/userStore';

definePageMeta({
  middleware: 'auth'
});
const userStore = useUserStore();
const userData = ref({
  firstname: userStore.userState?.firstname,
  lastname: userStore.userState?.lastname,
  email: userStore.userState?.email,
  city: userStore.userState?.city,
  street: userStore.userState?.street,
  zipcode: userStore.userState?.zipcode,
  phone: userStore.userState?.phone,
  cartTotal: userStore.userState?.cartTotal ?? 0,
  shipping: 3000
});

onMounted(async () => {
  const didToken = await magic.user.getIdToken();
  const { data } = await useFetch("/api/userInfo", {
    method: "GET",
    headers: { Authorization: `Bearer ${didToken}` },
  });
  userStore.setStateUser(data.value?.api as [UserInfo, { cartTotal: number }]);
  userData.value.firstname = data.value?.api[0].firstname;
  userData.value.lastname = data.value?.api[0].lastname;
  userData.value.email = data.value?.api[0].email;
  userData.value.city = data.value?.api[0].city;
  userData.value.street = data.value?.api[0].street;
  userData.value.zipcode = data.value?.api[0].zipcode;
  userData.value.phone = data.value?.api[0].phone;
  userData.value.cartTotal = data.value?.api[1].cartTotal;
}
)

const pen = ref(false);
const response = ref('');

const submitCheckoutForm = async () => {
  const didToken = await magic.user.getIdToken();
  pen.value = true;
  const { data, pending } = await useFetch("/api/placeOrder", {
    method: "POST",
    headers: { Authorization: `Bearer ${didToken}` },
    body: {
      firstname: userData.value.firstname,
      lastname: userData.value.lastname,
      email: userData.value.email,
      city: userData.value.city,
      street: userData.value.street,
      zipcode: userData.value.zipcode,
      phone: userData.value.phone,
      shipping: userData.value.shipping
    }
  })
  pen.value = pending.value;
  if (data.value?.error) {
    response.value = data.value?.error;
    setTimeout(() => {
      response.value = '';
    }, 5000);
  }
  if (data.value?.message === 'Success') {
    userData.value.cartTotal = 0;
  }
}
</script>

<template>
  <section class="max-w-[600px] mx-auto px-2 py-2 mt-1">
    <h2
      class="font-bold uppercase text-3xl mt-20  after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
      Checkout</h2>
    <form class="mt-2" @submit.prevent="submitCheckoutForm">
      <fieldset
        class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg p-5 flex flex-col gap-y-5 disabled:shadow-slate-500"
        :disabled="pen">
        <div class="grid grid-cols-2 gap-x-5">
          <div class="flex flex-col"><label for="firstname">First name:</label><input type="text" name="firstname"
              id="firstname" v-model="userData.firstname"
              class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" /></div>
          <div class="flex flex-col"><label for="lastname">Last name:</label><input type="text" name="lastname"
              id="lastname" v-model="userData.lastname"
              class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" /></div>
        </div>
        <div class="flex flex-col"><label for="email">Email address:</label><input type="email" name="email" id="email"
            v-model="userData.email"
            class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" disabled />
        </div>

        <div class="flex flex-col"><label for="city">City:</label><input type="text" name="city" id="city"
            v-model="userData.city"
            class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" />
        </div>
        <div class="flex flex-col"><label for="street">Street:</label><input type="text" name="street" id="street"
            v-model="userData.street"
            class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" /></div>
        <div class="flex flex-col"><label for="zip">Zip code:</label><input type="text" name="zip" id="zip"
            v-model="userData.zipcode"
            class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" /></div>
        <div class="flex flex-col"><label for="zip">Phone:</label><input type="tel" name="phone" id="phone"
            v-model="userData.phone"
            class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-2 mt-1 disabled:shadow-slate-500" /></div>
        <table>
          <tbody>
            <tr>
              <th class="text-right w-full">Cart totals:</th>
              <td class="text-right">{{ formatMoney(userData.cartTotal) }}</td>
            </tr>
            <tr>
              <th class="text-right w-full">Estimated shipping:</th>
              <td >{{ formatMoney(userData.shipping) }}</td>
            </tr>
            <tr>
              <th class="text-right w-full">Total:</th>
              <td >{{ formatMoney(userData.cartTotal + userData.shipping) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="response" class="text-red-500 text-center font-bold mt-2">
          {{ response }}
        </div>
        <button type="submit"
          class="bg-red-500 disabled:bg-slate-500 text-white border rounded-lg p-2 font-bold uppercase">Order</button>
      </fieldset>
    </form>
  </section>
</template>
