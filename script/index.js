$(function(){
    getWeatherData('ua', dataReceived, showError);

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; 
        var city = data.city.name;
        var country = data.city.country;
    
        var localTime = new Date(data.list[0].dt*1000 - offset); 
            addWeather(
                data.list[0].weather[0].icon,
                moment(localTime).calendar(),	
                data.list[0].weather[0].description,
                Math.round(data.list[0].temp.day) + '&deg;C',
                data.list[0].pressure,
                data.list[0].humidity,
                data.list[0].speed
        );
        $('.location').html(city + ', <b>' + country + '</b>'); 
    }

    function addWeather(icon, day, condition, temp, pressure, humidity, wind){            
        $('#day').html(day);
        $('#icon').html('<img width="90" height="90" src="icons/'+ icon +'.png" />');
        $('#temperature').html(temp);
        $('#condition').html(condition);    
        $('#pressure').html(pressure);
        $('#humidity').html(humidity);
        $('#wind').html(wind);
    };

    function showError(msg){
        $('#error').html('Виникла помилка: ' + msg);
    }
});
