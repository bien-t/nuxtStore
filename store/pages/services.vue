<script setup lang="ts">
interface Service {
    name: string
    description: string
    photoUrl: string
}
const serviceToShow = ref({ show: false, index: 0 });

const { data } = await useFetch("/api/getServices", {
    method: "GET",
})

const showFullService = (index: number) => {
    serviceToShow.value.show = true;
    serviceToShow.value.index = index;
}
</script>

<template>
    <section class="max-w-[1000px] mx-auto">
        <h2
            class="font-bold uppercase text-3xl mt-20  after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
            Services</h2>
        <div
            class="grid grid-cols-[repeat(auto-fit,minmax(100px,300px))] auto-rows-[150px] md:auto-rows-[250px] justify-center gap-5 mt-2 cursor-pointer">
            <div v-for="service, index in (data?.api as Service[])" class="relative" @click="showFullService(index)">
                <nuxt-img :src="service.photoUrl" :alt="`${service.name} photo`"
                    class="w-full h-full object-cover" :width="300" :height="300" />
                <span
                    class="absolute top-[50%] translate-y-[-50%] w-full text-center bg-red-500 text-white py-2 uppercase font-bold">{{
                        service.name
                    }}</span>
            </div>
        </div>
        <div class="bg-slate-500 bg-opacity-40 top-0 left-0 h-screen fixed w-full flex justify-center md:items-center p-2"
            v-show="serviceToShow.show">

            <div class=" rounded-lg p-2 max-w-[500px] text-white h-max relative">

                <h3 class=" w-full text-center bg-red-500 text-white py-2 uppercase font-bold">
                    {{
                        data?.api[serviceToShow.index].name
                    }}</h3>
                <nuxt-img :src="data?.api[serviceToShow.index].photoUrl"
                    :alt="`${data?.api[serviceToShow.index].name} photo`" class="w-full h-full max-h-[300px] object-cover" :width="500" />
                <p class="bg-stone-900 text-center  p-1 md:p-2">{{ data?.api[serviceToShow.index].description }}</p>
                <button type="button"
                    class="bg-stone-900 text-3xl   rounded-lg py-1 px-2 flex justify-center items-center absolute top-0 right-0"
                    @click="serviceToShow.show = false">&times;</button>
            </div>
        </div>
    </section>
</template>
