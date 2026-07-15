import { defineStore } from 'pinia'
import { get7DayWeather } from '@/api/api'
import { weatherAdapter } from '@/service/apiadapter'
import { detailWeatherAdapter } from '@/service/apiadapter'
import { getAIRecomendation } from '@/api/ai_api'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    fiveDayWeather: [],
    deatilWeather: [],
    fiveDayWeatherIsLoading: false,
    errorFiveDayWeather: null,
    currentDetailWeather: 0,
    aiRecomendation: {}
  }),
  //вынести вызовы адаптеров в геттеры
  //объеденить вызовы API
  actions: {
    async getFiveDaysWeatherData() {
      return await get7DayWeather()
    },
    async getAIRecomendationWeather(prompt) {
      const responce = await getAIRecomendation(prompt)
      this.aiRecomendation = responce
    },
    //объеденить вызовы адаптеров в одну функцию
    adaptWeatherData(rawData) {
      return weatherAdapter(rawData)
    },
    adaptDetailWeatherData(rawData) {
      return detailWeatherAdapter(rawData)
    },
    async fetchWeather() {
      this.fiveDayWeatherIsLoading = true;
      try {
        const raw = await this.getFiveDaysWeatherData()
        const adapted = this.adaptWeatherData(raw)
        console.log(adapted)
        this.fiveDayWeather = adapted
        const detail_adapted = this.adaptDetailWeatherData(raw)
        console.log(detail_adapted)
        this.deatilWeather = detail_adapted
      }
      catch (e) {
        console.log(e)
      }
      finally {
        this.fiveDayWeatherIsLoading = false
      }
    }
  }
})


