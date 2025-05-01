<template>
  <div class="card w-64 bg-base-100 shadow-md hover:shadow-lg transition-shadow" :class="{ 'opacity-50': tea.isDeleted }">
    <div class="card-body p-4">
      <span v-if="tea.isDeleted" class="badge badge-secondary">Нет в наличии</span>
      <div class="flex justify-between items-center">
        <h2 class="card-title text-lg font-bold">{{ tea.name }}</h2>
      </div>

      <div v-if="tea.tags?.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in tea.tags"
          :key="tag.id"
          :class="`badge badge-outline text-${tag.color}`"
          >
          {{ tag.name }}
        </span>
      </div>

      <p v-if="tea.description" class="text-sm text-base-content/80">{{ tea.description }}</p>

      <div class="mt-2">
        <label class="text-sm">Ваш рейтинг:</label>
        <div class="flex items-center">
          <div class="rating rating-sm">
            <input
              v-for="star in 5"
              :key="star"
              type="radio"
              :name="'user-rating-' + tea.id"
              class="mask mask-star-2 bg-orange-400"
              :value="star"
              v-model="userRating"
              @change="updateUserRating(star)"
            />
          </div>
          <span v-if="tea.averageRating !== undefined" class="ml-4 text-sm">
            {{ tea.averageRating.toFixed(1) }}
          </span>
          <span v-else class="ml-4 text-sm">-</span>
        </div>
      </div>

      <p class="text-sm font-semibold mt-2">Цена: {{ tea.price }} ₽</p>

      <p v-if="tea.note" class="text-sm italic text-base-content/70 mt-2">{{ tea.note }}</p>

      <p v-if="tea.categoryId" class="text-sm text-base-content/70 mt-2">Категория: {{ tea.categoryId }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { apiFetch } from '../utils/api'
import type { Tea } from '../types/tea'

const props = defineProps<{
  tea: Tea
}>()

const userRating = ref<number>(props.tea.rating)

const updateUserRating = async (rating: number) => {
  try {
    await apiFetch(`/api/v1/teas/${props.tea.id}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    })
    userRating.value = rating
  } catch (err) {
    console.error('Ошибка при обновлении рейтинга:', err)
    alert('Не удалось обновить рейтинг')
  }
}
</script>