let text = document.getElementById("huy")
let weather = document.getElementById("weather")
let description = document.getElementById("description")
let nameCity = document.getElementById("nameCity")
let input = document.getElementById("city")
let searchBtn = document.getElementById("search")
let feels = document.getElementById("feelLike")
let block = document.getElementById("container")
let pusto = document.getElementById("pusto")
let feelText = document.getElementById("feelText")
let img = document.getElementById("icon")
let cityTimeEl = document.getElementById("cityTimeEl")
let cityTimezone = 0
let country = document.getElementById("nameCountry")
let min = document.getElementById("min")
let max = document.getElementById("max")

searchBtn.addEventListener("click", function(){
    weatherInfo()
})
input.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        weatherInfo()
    }
})

function showTime() {
    let date = new Date()
    let time = date.toLocaleTimeString()

    text.textContent = time
}
showTime()
let timeId = setInterval(showTime, 1000)

function showCityTime(){
    let utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000
    let cityTime = new Date(utc + cityTimezone * 1000)
    cityTimeEl.textContent = cityTime.toLocaleTimeString()
}
setInterval(showCityTime, 1000)

function weatherInfo() {
    let inputText = input.value

    if (input.value.trim() === "") {
        pusto.textContent = "Впишите текст"
    } else {
        pusto.textContent = ""
        block.style.display = "block"
    

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=7b2a820a37170d3f228b7e000d5d87d7&units=metric&lang=ru`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                pusto.textContent = "Город не найден"
                block.style.display = "none"
                return
            } 
            weather.textContent = ` ${Math.round(data.main.temp)}℃`
            feelText.textContent = `Чувствуется как `
            feels.textContent = ` ${Math.round(data.main.feels_like)}℃`
            description.textContent = data.weather[0].description
            let iconCode = data.weather[0].icon
            img.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
            nameCity.textContent = data.name
            country.textContent = data.sys.country

            cityTimezone = data.timezone

        })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${inputText}&appid=7b2a820a37170d3f228b7e000d5d87d7&units=metric&lang=ru`)
        .then(response => response.json())
        .then(forecast => {
            let today = new Date().toISOString().split('T')[0]
            let todayList = forecast.list.filter(item => item.dt_txt.startsWith(today))
            let temps = todayList.map(item => item.main.temp)
            let minTemp = Math.round(Math.min(...temps))
            let maxTemp = Math.round(Math.max(...temps))

            min.textContent = minTemp
            max.textContent = maxTemp

            let days = forecast.list.filter(item => item.dt_txt.includes('12:00:00'))
            let dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда','Четверг', 'Пятница', 'Суббота']
            
            days.forEach((day, index) => {
                let date = new Date(day.dt_txt)
                let dayName = dayNames[date.getDay()]
                let temp = Math.round(day.main.temp)
                let icon = day.weather[0].icon

                let dateStr = day.dt_txt.split(' ')[0]
                let dayTemps = forecast.list
                    .filter(item => item.dt_txt.startsWith(dateStr))
                    .map(item => item.main.temp)

                    let min5 = Math.round(Math.min(...dayTemps))
                    let max5 = Math.round(Math.max(...dayTemps))

                document.getElementById(`day${index + 1}`).innerHTML = `
                    <p>${dayName}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                    <p>${temp}℃</p>
                    <p class = "minmax">${min5} / ${max5}</p>
                    `   

            })
        })
    input.value = ""
    }
}
