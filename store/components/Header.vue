<script setup lang="ts">

interface Slide {
    title: string
    image: {
        asset: {
            _id: string
            url: string
            metadata: {
                dimensions: {
                    width: number
                    height: number
                }
            }
        }
    }
}

interface Api {
    api: Slide[]
}

const { data: slides } = await useFetch<Api>("/api/getSlides", {
    method: "GET",
})

const setPrevious = () => {
    if (currentSlide.value - 1 < 1) {
        currentSlide.value = slides.value?.api.length ?? 1;
    } else {
        currentSlide.value = currentSlide.value - 1
    }
}

const setNext = () => {
    if (currentSlide.value + 1 > (slides.value?.api.length ?? 1)) {
        currentSlide.value = 1;
    } else {
        currentSlide.value = currentSlide.value + 1
    }
}
const currentSlide = ref(1);

const autoSlide = setInterval(() => {
    setNext()
}, 10000)

onMounted(() => {
    autoSlide
})

onUnmounted(() => {
    clearInterval(autoSlide)
})

</script>

<template>
    <header class="relative grid grid-rows-[200px]  grid-cols-[50px_1fr_50px] md:grid-rows-[400px] overflow-hidden">
        <Icon name="ic:round-arrow-back-ios"
            class="text-3xl md:text-5xl ml-7  z-10 self-center bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,1)] rounded-full p-1 cursor-pointer"
            @click="setPrevious" />
        <TransitionGroup name="slide">
            <nuxt-img v-show="currentSlide === index + 1" v-for="slide, index in slides?.api"
                :key="slide.image.asset._id" :src="slide.image.asset.url"
                class="absolute top-0 left-0 -z-10 w-full h-full object-cover" :alt="slide.title"
                :width="slide.image.asset.metadata.dimensions.width"
                :height="slide.image.asset.metadata.dimensions.height"
                sizes="xs:400px, md:1000px,lg:1500px 2xl:2000px"  />
        </TransitionGroup>
        <Icon name="ic:round-arrow-forward-ios"
            class="text-3xl md:text-5xl -ml-7 z-10 col-start-3 col-end-4 self-center  bg-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,1)] rounded-full p-1 cursor-pointer"
            @click="setNext" />
    </header>
</template>


<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.7s ease-in-out, scale 10s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    scale: 100%;
}

.slide-enter-to,
.slide-leave-from {
    opacity: 1;
    scale: 110%;
}
</style>