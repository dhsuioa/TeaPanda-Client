<template>
    <div class="min-h-screen flex flex-col">
      <header class="bg-base-200 px-4 pt-5 flex justify-between items-center">
          <h1 class="text-xl font-bold">Чай Китайской Панды</h1>
          <ThemeController />
      </header>
      <div class="bg-base-200">
        <div class="divider" />
      </div>
      <main class="flex-grow p-4 bg-base-200">
        <router-view />
      </main>
      <footer class="bg-base-300 p-4 text-center">
         <nav class="flex justify-center space-x-4">
          <router-link to="/auth" class="btn btn-primary">Войти</router-link>
          <router-link to="/auth" class="btn btn-primary">Войти</router-link>
          <router-link to="/auth" class="btn btn-primary">Войти</router-link>
        </nav>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  import ThemeController from '../components/ThemeController.vue'
  </script>