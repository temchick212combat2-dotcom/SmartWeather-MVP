<template>
  <div @click="$emit('notifyParent', forecast)" class="dayForecastElements">
    <div class="dayForecastElements_day">
      <p>
        {{ forecast.day }}
      </p>
    </div>
    <div class="dayForecastElements_element">
      <img :src="weatherImage" width="50" height="50" />
    </div>
    <div class="dayForecastElements_element">
      <div style="display: flex">
        <p>{{ forecast.temp_avg }}</p>
        <p>°C</p>
      </div>
    </div>
    <div class="dayForecastElements_element">
      <div style="display: flex">
        <p>Ветер</p>
        <p>{{ forecast.wind_avg }}</p>
        <p>м/с</p>
      </div>
    </div>
    <div class="dayForecastElements_element">
      <img src="@/assets/img/uv-index.png" width="50" height="50" />
      <p>{{ forecast.uvindex }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
defineEmits(['notifyParent'])
const props = defineProps({
  forecast: {
    type: Object,
    required: true,
  },
})
const weatherImage = computed(() => {
  const hasRain = props.forecast.recipitation > 0
  const isSunny = props.forecast.uvindex > 3

  if (isSunny && hasRain) return 'src/assets/img/pintandrain.png'
  if (isSunny && !hasRain) return 'src/assets/img/sun.png'
  if (!isSunny && hasRain) return 'src/assets/img/pintanddrain.png'
  return 'src/assets/img/sunandpint.png'
})
</script>

<style scoped>
.dayForecastElements_element {
  display: flex;
  font-size: 26px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dayForecastElements_day {
  text-align: center;
  border: 1px solid;
  border-radius: 10px;
}
</style>
