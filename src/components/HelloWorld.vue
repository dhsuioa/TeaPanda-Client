<template>
  <div class="p-4">
    <div class="flex flex-wrap gap-2">
      <button class="btn btn-neutral">Neutral</button>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-info">Info</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-error">Error</button>
    </div>
      <div v-if="teaStore.loading" class="text-center mt-4">Загрузка...</div>
      <div v-else-if="teaStore.error" class="text-center text-warning mt-4">{{ teaStore.error }}</div>
    <div v-else>
      <div class="flex flex-wrap justify-center gap-4 mt-4">
        <TeaCard v-for="tea in teaStore.teas" :key="tea.id" :tea="tea" />
      </div>
      <div class="flex justify-center mt-4 space-x-2">
        <button
          class="btn btn-primary"
          :disabled="!teaStore.hasPreviousPage"
          @click="teaStore.setPage(teaStore.currentPage - 1)"
        >
          Назад
        </button>
        <span class="self-center">Страница {{ teaStore.currentPage }}</span>
        <button
          class="btn btn-primary"
          :disabled="!teaStore.hasNextPage"
          @click="teaStore.setPage(teaStore.currentPage + 1)"
        >
          Вперёд
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTeaStore } from '../stores/tea'
import { onMounted } from 'vue'
import TeaCard from '../components/TeaCard.vue'

const teaStore = useTeaStore()

onMounted(() => {
  teaStore.fetchTeas()
})
</script>