const request = require('request');

//add new data to forecast
//1.update forecast string to add new data
//2.test locally
//3.commit changes and push to github and deploy to heroku
//4.verify live application

const forecast = (lat, long,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=b6057c2b1159501fea36c4e126933b87&query=${lat},${long}`;
    
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined);
        }else if(body.error){
            callback(body.error.info,undefined);
        }else{
            const data = body.current;
            callback(undefined,
                `Today's weather at ${body.location.name} is ${data.weather_descriptions[0]}. Temperature is ${data.temperature} celsius, although it feels like ${data.feelslike}! Humidity is ${data.humidity}%! and Wind Speed is ${data.wind_speed}${data.wind_dir} km/h.`
            );
        }
    })
};

module.exports = forecast;