export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/color-mode', '@nuxtjs/sanity', '@pinia/nuxt', '@nuxt/image-edge'],
    sanity: {
        projectId: "projectId",
        withCredentials: true,
        apiVersion: 'projectApiVersion',
        dataset:'projectDataset',
        useCdn:true
    },
    image: {
        domains: ['https://cdn.sanity.io'],        
    },
    css: ['~/assets/css/main.css'],
    typescript: { strict: true, typeCheck: true },
    build: {
        transpile: ["oh-vue-icons"]
    },
    colorMode: { classSuffix: '' },
    runtimeConfig: {
        API_WRITETOKEN: process.env.WRITE_TOKEN,
        MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
    },

})
