<template>
  <p>Совет от нейросети</p>
  <div v-if="store.aiRecomendation">{{ store.aiRecomendation }}</div>
</template>

<script setup>
import { useWeatherStore } from '@/stores/weather'
const store = useWeatherStore()
</script>

<style></style>
