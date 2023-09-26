<script setup>

</script>

<template>
  <MainBody>
    <template v-slot:h1>Blog</template>
    <div class="flex flex-col justify-center items-start">
      <div class="h-20">
        <p class="text-lg">Suivez ma progression à travers ce blog, ---</p>
      </div>

      <h2 class="text-xl font-medium w-full border-b">Catégories</h2>

      <div class="overflow-x-scroll flex flex-col sm:flex-row flex-wrap justify-center items-center mt-2 mb-8 w-full sm:space-x-2">
        <div class="border border-gray-300 py-1 px-2 space-x-2 rounded-full bg-gray-200 hover:bg-gray-300 flex flex-row justify-between">
          <span>💻</span>
          <span class="font-light">Dev Web</span>
        </div>

        <div class="border border-gray-300 py-1 px-2 space-x-2 rounded-full bg-gray-200 hover:bg-gray-300 flex flex-row justify-between">
          <span>🕹</span>
          <span class="font-light">Dev Jeux</span>
        </div>

        <div class="border border-gray-300 py-1 px-2 space-x-2 rounded-full bg-gray-200 hover:bg-gray-300 flex flex-row justify-between">
          <span>✏️</span>
          <span class="font-light">Rédaction</span>
        </div>
        
        <div class="border border-gray-300 py-1 px-2 space-x-2 rounded-full bg-gray-200 hover:bg-gray-300 flex flex-row justify-between">
          <span>💀</span>
          <span class="font-light">Hors topic</span>
        </div>
      </div>

      <div class="w-full flex flex-col items-start justify-start space-y-4">
        
        <div class="flex flex-row justify-start bg-gray-100 hover:bg-gray-200 w-full rounded-3xl border duration-200 group">
          <img src="https://picsum.photos/200/150" alt="" class="rounded-l-3xl hidden sm:inline">
          <div class="flex flex-col flex-1 justify-between items-start px-4">
            <h2 class="py-2 text-2xl font-medium border-b-2 group-hover:border-b-gray-100 w-full group-hover:underline">Article Blog #35</h2>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ducimus a animi iste impedit molestias accusantium repellat voluptates maiores, natus beatae asperiores ad fuga corporis dignissimos quaerat magnam doloremque cupiditate?
            </p>
            <span class="py-1 mt-2 border-t-2 group-hover:border-t-gray-100 w-full text-gray-500">Rédigé le 22/22/2022 par Brua</span>
          </div>
        </div>

        <div class="flex flex-row justify-start bg-gray-100 hover:bg-gray-200 w-full rounded-3xl border duration-200 group">
          <img src="https://picsum.photos/200/150" alt="" class="rounded-l-3xl hidden sm:inline">
          <div class="flex flex-col flex-1 justify-between items-start px-4">
            <h2 class="py-2 text-2xl font-medium border-b-2 group-hover:border-b-gray-100 w-full group-hover:underline">Article Blog #35</h2>
            <p class="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ducimus a animi iste impedit molestias accusantium repellat voluptates maiores, natus beatae asperiores ad fuga corporis dignissimos quaerat magnam doloremque cupiditate?
            </p>
            <span class="py-1 mt-2 border-t-2 group-hover:border-t-gray-100 w-full text-gray-500">Rédigé le 22/22/2022 par Brua</span>
          </div>
        </div>

      </div>

      <div class="w-full mx-auto flex flex-row items-center justify-center h-12 mt-14">
        <button class="p-2 rounded-xl border border-gray-300 hover:bg-gray-200">Afficher plus d'articles</button>
      </div>

    </div>
  </MainBody>
</template>