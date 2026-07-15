export async function get7DayWeather() {
  const response = await fetch(`https://my.meteoblue.com/packages/basic-day?apikey=YRNJzbceXhpBGEoq&lat=55.8666&lon=48.3593&asl=60&format=json`);
  if (response.status !== 200) {
    console.log('Сломалось')
    console.log(response.status)
    const error = new Error('Все сломалось')
    throw error
  }
  if (!response) {
    console.log('Сломалось тут')
  }
  return await response.json()
}
