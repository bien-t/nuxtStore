

<script setup lang="ts">
const { data } = await useFetch("/api/getProducts", {
  method: "GET",
})
</script>

<template>
  <section class="max-w-[1000px] mx-auto  my-20 px-5">

    <h2
      class="text-3xl font-bold uppercase after:content-[''] text-center after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500">
      Latest Products</h2>
    <div v-if="data?.api"
      class="grid grid-cols-[repeat(auto-fit,minmax(100px,250px))] auto-rows-[minmax(100px,250px)] gap-5 mt-7 justify-center">
      <Product v-for="product in data.api" :product="product" />
    </div>

  </section>
</template>
