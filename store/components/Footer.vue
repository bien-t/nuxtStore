<script setup lang="ts">


</script>

<template>
   <footer class="bg-stone-900 text-white mt-auto pt-10 pb-10">
      <div
         class="max-w-[1000px] mx-auto grid lg:grid-cols-[repeat(auto-fit,minmax(100px,300px))] justify-center  text-center gap-5">
         <div>
            <h4
               class="font-bold uppercase text-xl after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500">
               Additional links</h4>
            <ul class="mt-3 grid gap-y-2">
               <li><NuxtLink to='/'>Terms and Conditions</NuxtLink></li>
               <li><NuxtLink to='/'>Privacy Policy</NuxtLink></li>
            </ul>

         </div>
         <div>
            <h4
               class="font-bold uppercase text-xl after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
               Services</h4>
            <ul class="mt-3 grid gap-y-2">
               <li>
                  <NuxtLink to='/services'>Lighting</NuxtLink>
               </li>
               <li>
                  <NuxtLink to='/services'>Interior design</NuxtLink>
               </li>
               <li>
                  <NuxtLink to='/services'>Kids' room furniture</NuxtLink>
               </li>
               <li>
                  <NuxtLink to='/services'>Decoration</NuxtLink>
               </li>
            </ul>

         </div>
         <div>
            <h4
               class="font-bold uppercase text-xl after:content-[''] after:flex after:mx-auto after:h-1 after:w-16 after:bg-red-500 text-center">
               Contact Us</h4>
            <p class="mt-3">270 Vesta Drive,
               Gatewood, Missouri</p>
         </div>


      </div>
   </footer>
</template>
