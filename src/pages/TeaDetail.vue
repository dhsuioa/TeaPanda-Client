<template>
    <div class="p-4">
      <div v-if="loading" class="text-center">Загрузка...</div>
      <div v-else-if="error" class="text-center text-warning">{{ error }}</div>
      <div v-else>
        <h1 class="text-2xl font-bold">{{ tea.name }}</h1>
        <p class="mt-2">{{ tea.description }}</p>
        <p class="mt-2">Цена: {{ tea.price }} ₽</p>
        <p class="mt-2">Примечание: {{ tea.note }}</p>
        <div class="mt-2">
          <span v-for="tag in tea.tags" :key="tag.id" class="badge badge-outline mr-2">{{ tag.name }}</span>
        </div>
        <router-link to="/" class="btn btn-primary mt-4">Назад</router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { teaService } from '../api/teaService'
  import type { Tea } from '../types/tea'
  
  const route = useRoute()
  const tea = ref<Tea>({} as Tea)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const fetchTea = async () => {
    const id = route.params.id as string
    try {
      tea.value = await teaService.getTeaById(id)
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить данные о чае'
    } finally {
      loading.value = false
    }
  }
  
  onMounted(fetchTea)
  </script>