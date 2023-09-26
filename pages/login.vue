<script setup>
</script>

<template>
  <MainBody>
    <template v-slot:h1>Connexion / S'enregistrer</template>
    <div class="flex flex-col justify-center items-center mx-auto">
      <div class="flex flex-col sm:flex-row justify-center items-center h-fit space-y-8 md:space-y-0 md:h-72 w-full">
        <div class="h-full md:border-r border-b sm:border-b-0 sm:pb-0 pb-12 border-b-gray-300 flex flex-col items-center justify-start border-r-gray-300 space-y-4 md:pr-16 w-1/2">
          <h2 class="text-xl">Connexion</h2>
          <div class="flex flex-col justify-center items-center space-y-2 h-full">
            <input type="text" name="username" id="username" class="border border-gray-800 px-2" placeholder="Pseudo / E-mail">
            <input type="password" name="password" id="password" class="border border-gray-800 px-2" placeholder="Mot de passe">
          </div>
          <div class="flex flex-row justify-center items-center space-x-2">
            <input type="checkbox" name="stayLogged" id="stayLogged">
            <label for="stayLogged">Rester connecté</label>
          </div>
          <button class="px-8 py-2 bg-gray-300">Connexion</button>
        </div>
        
        <div class="h-full flex flex-col items-center justify-start space-y-4 px-4 w-1/2">
          <h2 class="text-xl">S'enregistrer</h2>
          <div class="flex flex-col justify-center items-center space-y-2 h-full">
            <input type="text" name="username" id="username" class="border border-gray-800 px-2" placeholder="Pseudo">
            <input type="email" name="email" id="email" class="border border-gray-800 px-2" placeholder="E-Mail">
            <input type="password" name="password" id="password" class="border border-gray-800 px-2" placeholder="Mot de passe">
            <input type="password" name="confirmPassword" id="confirmPassword" class="border border-gray-800 px-2" placeholder="Confirmez mot de passe">
          </div>
          <div class="flex flex-row justify-center items-center space-x-2">
            <input type="checkbox" name="agreeTerms" id="agreeTerms">
            <label for="agreeTerms">Vous acceptez les conditions générales du site</label>
          </div>
          <button class="px-8 py-2 bg-gray-300">S'enregistrer</button>
        </div>
      </div>
    </div>
  </MainBody>
</template>