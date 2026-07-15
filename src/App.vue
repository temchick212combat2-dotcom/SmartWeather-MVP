<script setup>
import { useWeatherStore } from './stores/weather'
//import ErrorPage from './components/ErrorPage.vue'
import DetailWeather from './components/DetailWeather.vue'
import ForecastWeather from './components/ForecastWeather.vue'
import { onMounted } from 'vue'
import AIRecomendation from './components/AIRecomendation.vue'
const store = useWeatherStore()
onMounted(() => {
  store.fetchWeather()
  //store.getAIRecomendationWeather()
})
</script>
<template>
  <div class="main">
    <ForecastWeather v-if="store.fiveDayWeather"></ForecastWeather>
    <DetailWeather v-if="store.fiveDayWeather"></DetailWeather>
    <AIRecomendation v-if="store.aiRecomendation"></AIRecomendation>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
</style>
