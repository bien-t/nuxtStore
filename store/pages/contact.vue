<script setup lang="ts">

const formData = ref({
    username: '',
    email: '',
    phone: '',
    message: '',
    subject: ''
});

const response = ref('');

const submitForm = async () => {
    const { data } = await useFetch("/api/contact", {
        method: "POST",
        body: {
            formData: {
                username: formData.value.username,
                email: formData.value.email,
                phone: formData.value.phone,
                message: formData.value.message,
                subject: formData.value.subject,
            }
        }
    });
    if (data.value?.api === 'Success') {
        formData.value.username = '';
        formData.value.email = '';
        formData.value.phone = '';
        formData.value.message = '';
        formData.value.subject = '';
    }

    response.value = data.value?.api ?? '';
    setTimeout(() => {
        response.value = '';
    }, 5000);
}
</script>

<template>
    <section class="max-w-[400px] mx-auto">
        <h2
            class="font-bold uppercase text-3xl mt-20  after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
            Contact</h2>
        <div v-if="response === 'Success'" class="text-green-500 text-center font-bold mt-2">
            We've received your message. Our team will contact you soon.
        </div>
        <div v-if="response === 'Error'" class="text-red-500 text-center font-bold mt-2">
            Please, fill in all empty fields and try again.
        </div>
        <form class="flex  flex-col items-center gap-y-3 mt-5" @submit.prevent="submitForm">
            <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="username">Your name:</label><input
                    type="text" name="username" id="username" v-model="formData.username"
                    class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" required /></div>

            <div class="grid text-center sm:text-left sm:grid-cols-2"><label for="email">Email address:</label><input
                    type="email" name="email" id="email" v-model="formData.email"
                    class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" required /></div>
            <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="phonenumber">Phone
                    number:</label><input type="tel" name="phonenumber" id="phonenumber" v-model="formData.phone"
                    class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" required /></div>
            <div class="grid text-center sm:text-left sm:grid-cols-2 items-center"><label for="subject">Subject:</label><input
                    type="text" name="subject" id="subject" v-model="formData.subject"
                    class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 py-1" required /></div>
            <div class="grid text-center w-full p-2 sm:p-0 "><label for="message" class="mb-1">Message:</label><textarea
                    type="text" name="message" id="message" v-model="formData.message"
                    class="shadow-red-500 shadow-[0px_0px_3px] rounded-lg px-2 resize-none w-full" rows="5" required></textarea>
            </div>
            <button type="submit" class="bg-red-500 text-white border rounded-lg p-2">Submit</button>
        </form>
    </section>
</template>
