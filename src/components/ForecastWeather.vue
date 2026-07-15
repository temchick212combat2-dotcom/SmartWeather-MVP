<template lang="">
  <div class="forecast">
    <div v-if="store.fiveDayWeatherIsLoading">Загружается</div>
    <DayWeather
      @notifyParent="clickDetail(readyDay)"
      v-for="readyDay in readyData"
      :key="readyDay"
      :forecast="readyDay"
      class="dayForecast"
    >
    </DayWeather>
  </div>
</template>
<script setup>
import DayWeather from './DayWeather.vue'
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'
const store = useWeatherStore()
//переделать на ToRefs!!!
const readyData = computed(() => store.fiveDayWeather)
//TODO: вынести метод изменения текущего детального индекса в Pinia
const detailToggle = (forecast) => (store.currentDetailWeather = readyData.value.indexOf(forecast))
function buildPromptCompact(weatherData, detailData) {
  return `Ты — ИИ-ассистент по подбору одежды. Дай краткие рекомендации по одежде и SPF для каждого дня.

Правила:
- Температура: <-15°C (пуховик), -15..-5 (зимняя куртка), -5..+5 (демисезон), +5..+12 (пальто), +12..+18 (толстовка), +18..+25 (футболка), >25 (лёгкая одежда + головной убор)
- Ветер >7 м/с = ветрозащита, >12 м/с = утеплить
- Осадки >0.5 мм = зонт/непромокаемая куртка
- SPF: UV 0-2 (нет), 3-5 (SPF 15-30), 6-7 (SPF 30-50), 8+ (SPF 50+)
-Учитывай минимальную и максимальную температуру при рекомендациях, рекомендуй одежду как для самой низкой температуре, так и для самой высокой температуры

Данные:
${weatherData.temp_avg} средняя температура
${weatherData.twind_avg} средняя скорость ветра
${weatherData.uvindex} УФ Индекс
${weatherData.precipitation} ожидаемые осадки
${detailData.temp_min} минимальная температура
${detailData.temp_max} максимальная температура


Формат ответа:
👕 Одежда: [1-2 предложения]
🧴 SPF: [нужен/не нужен] — [пояснение]`
}

function clickDetail(forecast) {
  detailToggle(forecast)
  const prompt = buildPromptCompact(
    store.fiveDayWeather[store.currentDetailWeather],
    store.deatilWeather[store.currentDetailWeather],
  )
  store.getAIRecomendationWeather(prompt)
}
</script>
<style scoped>
.dayForecast {
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.forecast {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
