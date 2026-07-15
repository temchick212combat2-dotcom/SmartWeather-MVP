<script setup>
import { useWeatherStore } from '@/stores/weather.js'
import { computed } from 'vue'
const store = useWeatherStore()
const detailWeather = computed(() => store.deatilWeather[store.currentDetailWeather])
</script>

<template>
  <p>Детальный прогноз</p>
  <div>
    <p>
      Перепадты температур от &nbsp;
      {{ detailWeather?.temp_min }}
      до
      {{ detailWeather?.temp_max }}
    </p>
  </div>
  <div>
    <p>Ощущается как {{ detailWeather?.temp_mean }}</p>
  </div>
  <div>
    <p>
      Перепадты давления от &nbsp;
      {{ detailWeather?.releat_min }}
      до
      {{ detailWeather?.releat_max }}
    </p>
  </div>
</template>

<style></style>
