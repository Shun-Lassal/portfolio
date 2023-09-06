<script setup>
const { $anime } = useNuxtApp()

onMounted(() => {
  $anime({ targets: '.title', translateX: 250, duration: 800 }, {targets: '.link', paddingTop: 0, duration: 800})
})

</script>

<template>
  <MainBody>
    <template v-slot:h1>Bienvenue, visiteur!</template>
    <div class="h-64 md:h-96 flex flex-col justify-center items-start relative px-4">
      <span class="text-3xl z-10">
        "Work hard for greater results" - Moi
      </span>
      <img class="absolute right-0 md:right-10 z-0 rounded-xl px-4 md:px-0 hidden md:block" src="https://picsum.photos/500/300" alt="">
    </div>
  
    <div class="h-fit pb-14 border-b-2 border-b-slate-500 border-opacity-30 flex flex-col justify-around items-center">
      <div class="flex flex-col md:flex-row items-center justify-around w-full space-y-4 md:space-y-0">
        <div class="w-full flex flex-col justify-center items-center"><span class="px-8 py-4 border-2 border-gray-200 duration-100 hover:border-gray-950 font-medium hover:tracking-wider">Mon blog</span></div>
        <div class="w-full flex flex-col justify-center items-center"><span class="px-8 py-4 border-2 border-gray-200 duration-100 hover:border-gray-950 font-medium hover:tracking-wider">Mes outils</span></div>
        <div class="w-full flex flex-col justify-center items-center"><span class="px-8 py-4 border-2 border-gray-200 duration-100 hover:border-gray-950 font-medium hover:tracking-wider">A propos</span></div>
      </div>
    </div>

    <div class="w-full flex flex-col justify-start items-start">
      <h4 class="text-6xl font-light my-12">Je m'appelle Shun !</h4>
      <div class="w-full flex flex-col items-start justify-start text-xl space-y-4 pb-12">
        <span>J'ai pour passion le code et les jeux vidéos !</span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eveniet aspernatur, omnis sint excepturi quasi maxime neque explicabo ab aperiam unde, molestias fugiat vitae libero veritatis expedita saepe. Odio, sunt.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ullam dolorum corporis autem pariatur sequi eaque odit minima explicabo, suscipit aperiam, laborum nemo odio deserunt itaque soluta, cum aliquam impedit!
        </span>
        <h4 class="pt-8 my-4 text-2xl font-bold">Mes technos:</h4>
        <div class="flex flex-row items-start justify-evenly w-full h-full pt-16">
          <div class="flex flex-col items-center space-y-16 h-full w-full">

            <div class="flex flex-col md:flex-row items-center md:items-start justify-evenly md:space-x-4 w-full">
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:javascript" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:vue" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:tailwindcss-icon" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:pinia" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
            </div>

            <div class="flex flex-col md:flex-row items-center md:items-start justify-evenly md:space-x-4 w-full">
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:nuxt-icon" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:nodejs-icon" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="devicon:mongoose" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-dotted border-gray-200 group">
                <Icon name="logos:php" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
              <div class="p-6 rounded-full duration-200 hover:bg-gray-300 shadow-md border-2 border-gray-200 group">
                <Icon name="logos:mysql" size="2em" class="saturate-0 duration-300 group-hover:saturate-100"/>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>


    <div class="pt-8 mt-8 border-t-2 border-t-slate-500 border-opacity-30">
      <h3 class="mb-4 text-3xl underline">Mon blog</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        
        <div class="group cursor-pointer w-full relative h-60 bg-gray-700 p-2 flex flex-col justify-center items-start shadow-sm rounded-md border border-slate-600">
          <div class="z-20 w-full h-full absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center opacity-100 duration-300 group-hover:opacity-0">
            <h3 class="font-light text-4xl">Article Blog #35</h3>
          </div>
          <div class="z-10 w-full bg-gray-700 absolute top-0 right-0 left-0 bottom-0 flex flex-row rounded-md">
            <img src="https://picsum.photos/300/200" alt="" class="object-fill h-full w-full rounded-md">
          </div>
          <div class="pointer-events-none z-10 flex flex-col justify-around items-start rounded-md h-36 bg-gray-100 py-2 absolute bottom-0 left-0 right-0 px-2 space-y-1 transform-gpu translate-y-36 duration-500 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0">
            <h3 class="font-medium">Article Blog #35</h3>
            <div class="w-full h-full border-b border-t border-b-slate-400 border-t-slate-400 border-opacity-30 overflow-y-auto">
              <p class="w-full">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid amet nulla neque reiciendis, repudiandae, nisi eveniet officia minima suscipit impedit aspernatur.</p>
            </div>
            <div class="w-full flex flex-row justify-end items-center space-x-2 font-thin">
              <span>Brua</span>
              <span>-</span>
              <span>22/01/2023</span>
            </div>
          </div>
        </div>
        
        
      </div>
      <div class="w-full flex flex-row items-center justify-center mt-8">
        <span class="my-2 p-2 text-slate-300">Voir tous les articles</span>
      </div>
    </div>
  </MainBody>
</template>