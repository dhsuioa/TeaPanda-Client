<template>
  <button @click="addNewItem">Add Item</button>
  <ul>
    <li v-for="item in store.items" :key="item.id">{{ item.name }}</li>
  </ul>
  <button class="btn btn-primary">Click me</button>
  <button class="btn btn-secondary">Click me</button>
</template>

<script setup lang="ts">
import { useCrudStore } from "../stores/crud.ts";

const store = useCrudStore()
const addNewItem = () => {
  store.addItem({ id: Date.now(), name: 'New Item' })
}

</script>