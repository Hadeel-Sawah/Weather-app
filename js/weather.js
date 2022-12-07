let app = document.querySelector('.weather-app');
let temp = document.querySelector('.temp');
let nameCity = document.querySelector('.name');
let timeOutput = document.querySelector('.time');
let dateOutput = document.querySelector('.date');
let icon = document.querySelector('.icon');
let condationOutput = document.querySelector('.condation');
let cloudOutput = document.querySelector('.cloud');
let humidityOutput = document.querySelector('.humidity');
let windOutput = document.querySelector('.wind');
let search = document.querySelector('.search');
let btnsearch = document.querySelector('.submit');
let cities = document.querySelectorAll('.city');
let form = document.getElementById('locationInput');
let cityInput ='londan';
cities.forEach((city)=>{
    city.addEventListener('click',(even)=>{
        nameCity.innerHTML = even.target.innerHTML;
        app.style.opacity = '0';
        fetchWeatherData();

    });
})
form.addEventListener('search',(even)=>{
    if(search.value.length == 0 ){
        alert('please type a city name');
    }else{
        nameCity.innerHTML= search.value;
        search.value =' ';
        app.style.opacity = '0';
        fetchWeatherData();
    };
   
})
    let days=[
        'sunday','monday','tuesday','wednesday','thursday',
        'friday','saturday'
    ];
    let today = new Date();
    let currentDay= `${days[today.getDay()]}`;
async function fetchWeatherData(){
    try {
    let response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=beaa6830775a4e99910131438220406&q=${nameCity.innerHTML}`);
    let dataReady = await response.json();
     console.log(dataReady);
     temp.innerHTML= dataReady.current.condition.temp_c +`&#176;` ;
     console.log(temp.innerHTML= dataReady.current.temp_c+`&#176;`);
     condationOutput.innerHTML = dataReady.current.condition.text;
     let date = dataReady.location.localtime;
     let y = parseInt(date.substr(0,4));
     let m = parseInt(date.substr(5,2));
     let d = parseInt(date.substr(8,2));
     let time = date.substr(11);
     dateOutput.innerHTML= `${currentDay} ${d},${m},${y}`;
     timeOutput.innerHTML= time;
     nameCity.innerHTML= dataReady.location.name;
     icon.src=dataReady.current.condition.icon;
     cloudOutput.innerHTML=dataReady.current.cloud +"%";
     humidityOutput.innerHTML=dataReady.current.humidity +"%";
     windOutput.innerHTML=dataReady.current.wind_kph +"km/h";
     let timeOfDay ='day';
     let code = dataReady.current.condition.code;
     if(!dataReady.current.is_day){
        timeOfDay='night';
     };
     if(code == 1000){
        app.style.backgroundImage=` url(../img/${timeOfDay}/clear.jpg)`;
        btnsearch.style.background = '#e5ba92';
        if(timeOfDay == 'night'){
            btnsearch.style.background = '#181e27';
        }
     }else if(code == 1003||code == 1006||
        code == 1009|| code == 1030|| code == 1069||
        code == 1087||code == 1135||code == 1273||
        code == 1276||code == 1279||code == 1282
     ){
        app.style.backgroundImage=` url(../img/${timeOfDay}/cloudy.jpg)`;
        btnsearch.style.background ='#fa6d1b';
        if(timeOfDay == 'night'){
            btnsearch.style.background = '#181e27';
        }
     }
     else if(code == 1063||code == 1069||
        code == 1072|| code == 1150|| code == 1153||
        code == 1180||code == 1183||code == 1186||
        code == 1189||code == 1192||code == 1195||
        code == 1240||code == 1243||code == 1246||
        code == 1249||code == 1252
     ){
        app.style.backgroundImage=` url(../img/${timeOfDay}/rainy.jpg)`;
        btnsearch.style.background = '#647d75';
        if(timeOfDay == 'night'){
            btnsearch.style.background = '#325c80';
        }
        else{
            app.style.backgroundImage=` url(../img/${timeOfDay}/snowy.jpg`;  
            btnsearch.style.background = '#4d72aa';
        if(timeOfDay == 'night'){
            btnsearch.style.background = '#1b1b1b';
        }
        }
     }
     app.style.opacity = '1';
    //     alert('City Not Found , Please Try again');
} catch (error) {
    onerror = true;
 }
     
}
fetchWeatherData()