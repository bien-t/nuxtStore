<script setup lang="ts">

import { UserInfo, useUserStore } from '~~/stores/userStore';
definePageMeta({
  middleware: 'auth'
});
const userStore = useUserStore();
const userData = ref({
  firstname: '',
  lastname: '',
  email: '',
  city: '',
  street: '',
  zipcode: '',
  phone: '',
});

onMounted(async () => {
  const didToken = await magic.user.getIdToken();
  const { data } = await useFetch("/api/userInfo", {
    method: "GET",
    headers: { Authorization: `Bearer ${didToken}` },
  })
  userStore.setStateUser(data.value?.api as [UserInfo,{cartTotal:number}]);
})

const submitForm = async () => {
  const didToken = await magic.user.getIdToken();
  const { data } = await useFetch("/api/updateUser", {
    method: "POST",
    headers: { Authorization: `Bearer ${didToken}` },
    body: {
      userData: {
        firstname: userData.value.firstname,
        lastname: userData.value.lastname,
        email: userData.value.email,
        city: userData.value.city,
        street: userData.value.street,
        zipcode: userData.value.zipcode,
        phone: userData.value.phone,
      }
    }
  })
  userStore.setStateUser(data.value?.api as [UserInfo,{cartTotal:number}]);
  userData.value.firstname = '';
  userData.value.lastname = '';
  userData.value.email = '';
  userData.value.city = '';
  userData.value.street = '';
  userData.value.zipcode = '';
  userData.value.phone = '';
}

</script>

<template>
  <section class="max-w-[1000px] mx-auto">
    <h2
      class="font-bold uppercase text-3xl mt-20  after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
      Your profile</h2>
    <form class="flex  flex-col items-center gap-y-3 mt-5" @submit.prevent="submitForm">
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="firstname">First name:</label><input
          type="text" name="firstname" :placeholder="userStore.userState?.firstname" id="firstname"
          v-model="userData.firstname" class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" /></div>
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="lastname">Last name:</label><input
          type="text" name="lastname" :placeholder="userStore.userState?.lastname" id="lastname"
          v-model="userData.lastname" class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" /></div>
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="email" >Email address:</label><input
          type="email" name="email" id="email" :placeholder="userStore.userState?.email" v-model="userData.email"
          class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1 disabled:shadow-slate-500" disabled /></div>
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="city">City:</label><input type="text"
          name="city" id="city" :placeholder="userStore.userState?.city" v-model="userData.city"
          class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" /></div>
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="street">Street:</label><input type="text"
          name="street" id="street" :placeholder="userStore.userState?.street" v-model="userData.street"
          class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" /></div>
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="zip">Zip code:</label><input type="text"
          name="zip" id="zip" :placeholder="userStore.userState?.zipcode" v-model="userData.zipcode"
          class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" /></div>
      <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="phone">Phone:</label><input type="tel"
          name="phone" :placeholder="userStore.userState?.phone" id="phone" v-model="userData.phone"
          class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" /></div>
      <button type="submit" class="bg-red-500 text-white border rounded-lg p-2">Update</button>
    </form>
  </section>
</template>
