export function weatherAdapter(raw) {
  const readyData = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(raw.data_day.time[i]);
    const formatedDate = date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
    readyData.push({
      day: formatedDate,
      temp_avg: Math.ceil(raw.data_day.temperature_instant[i]),
      wind_avg: Math.ceil(raw.data_day.windspeed_mean[i]),
      pictocode: raw.data_day.pictocode[i],
      precipitation: Math.ceil(raw.data_day.precipitation[i]),
      uvindex: raw.data_day.uvindex[i],
    })
  }
  return readyData
}
export function detailWeatherAdapter(raw) {
  const readyData = [];
  for (let i = 0; i < 7; i++) {
    readyData.push({
      temp_min: Math.ceil(raw.data_day.temperature_min[i]),
      temp_max: Math.ceil(raw.data_day.temperature_max[i]),
      wind_min: Math.ceil(raw.data_day.windspeed_min[i]),
      wind_max: Math.ceil(raw.data_day.windspeed_max[i]),
      temp_mean: Math.ceil(raw.data_day.temperature_mean[i]),
      wind_mean: Math.ceil(raw.data_day.windspeed_min[i]),
      releat_min: Math.ceil(raw.data_day.relativehumidity_min[i]),
      releat_max: Math.ceil(raw.data_day.relativehumidity_max[i]),
    })
  }
  return readyData
}
