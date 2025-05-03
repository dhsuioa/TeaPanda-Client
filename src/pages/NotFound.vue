<template>
  <main class="flex items-center justify-center min-h-150">
    <div class="text-center space-y-6">
      <div class="text-error font-bold text-3xl">404</div>
      <h1 class="text-5xl font-bold">Страница не найдена</h1>
      <p class="text-lg text-base-content">
        Извините, мы не смогли найти страницу, которую вы ищете.
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <router-link to="/" class="btn btn-primary">Вернуться на главную</router-link>
      </div>
    </div>
  </main>
</template>
