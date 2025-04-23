import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCrudStore = defineStore('crud', () => {
  const items = ref<any[]>([])

  const addItem = (item: any) => {
    items.value.push(item)
  }

  const updateItem = (id: number, updatedItem: any) => {
    const index = items.value.findIndex((item) => item.id === id)
    if (index !== -1) items.value[index] = updatedItem
  }

  const deleteItem = (id: number) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return { items, addItem, updateItem, deleteItem }
})