<script setup lang="ts">
import { useAuthStore } from './stores/authStore';

const colorMode = useColorMode();
const userStore = useAuthStore();

onMounted(async ()=>{
  const isLogged = await magic.user.isLoggedIn();
  const metadata = await magic.user.getMetadata();
  userStore.setStateAuth(isLogged);
  userStore.setStateUser(metadata);

})

colorMode.value = 'light';

</script>

<template>
  <Navigation></Navigation>
  <main class="mb-10">
    <NuxtPage></NuxtPage>

  </main>

  <Footer></Footer>
</template>
