<script setup>
</script>

<template>
  <div class="text-gray-800 bg-gradient-to-tr from-blue-900 to-orange-400 via-red-900 h-screen overflow-y-scroll">
    <!-- AD SPACE
    <div class="w-full bg-blue-950 text-white h-12 text-xs relative flex flex-row justify-center items-center">
      <span class="absolute">Discover my new stuff here</span>
      <span class="absolute right-0 m-4 text-slate-700 hover:text-slate-200 select-none">x</span>
    </div>
    AD SPACE -->
    <div class="w-full px-4 md:px-8 py-2 md:py-4 shadow-sm">
      <div class="h-full z-10 flex flex-col justify-start items-center w-full bg-gray-100 rounded-xl">
        <div class="flex flex-row justify-center items-center border-b border-b-slate-600 shadow-md w-full py-4">
          <div class="w-full flex flex-row justify-start items-center ml-4 mr-4">
            <div class="mr-2 relative before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-gray-700 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700">
              <span class="font-bold">LSDev</span>
            </div>
            <div>

            </div>
            <div class="space-x-2 h-full sm:flex hidden">
              <div>
                <span>-</span>
              </div>
              <RouterLink to="" class="relative before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-gray-700 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700"><span class="my-auto">Blog</span></RouterLink>
              <span class="font-thin">|</span>
              <RouterLink to="" class="relative before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-gray-700 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700"><span class="my-auto">Outils</span></RouterLink>
              <span class="font-thin">|</span>
              <RouterLink to="" class="relative before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-gray-700 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700"><span class="my-auto">Projets</span></RouterLink>
              <span class="font-thin">|</span>
              <RouterLink to="" class="relative before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-gray-700 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700"><span class="my-auto">A propos</span></RouterLink>
              <span class="font-thin">|</span>
              <RouterLink to="" class="relative before:w-0 before:h-0.5 before:absolute before:bottom-0 before:right-0 before:bg-gray-700 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 hover:before:bg-gray-700"><span class="my-auto">Plus</span></RouterLink>
              <div>
                <span>-</span>
              </div>
            </div>
          </div>
          <div class="w-fit mr-4 flex-row items-center space-x-2 hidden lg:flex">
            <input type="text" ref="usernameLogin" class="w-32 bg-transparent border border-slate-600 px-2" placeholder="Pseudo"/>
            <input type="password" ref="passwordLogin" class="w-32 bg-transparent border border-slate-600 px-2" placeholder="Mot de passe"/>
            <span class="font-bold p-0.5 border border-slate-600 px-2">Connexion</span>
            <span class="font-thin">|</span>
            <span class="font-bold p-0.5 border border-slate-600 px-2">S'enregistrer</span>
          </div>

        </div>
        <div class="container h-fit w-full flex flex-col justify-start px-2">
          <div class="h-44 flex flex-col justify-center items-center sm:items-start">
            <h1 class="text-4xl sm:text-5xl drop-shadow-md duration-300 font-bold">
              <slot name="h1"></slot>
            </h1>
          </div>

          <!-- Main content-->
          <div class="mb-16 h-full">
            <slot></slot>
          </div>  
          <!-- Main content-->

          <FooterBody />
        </div>
      </div>
    </div>
  </div>
</template>