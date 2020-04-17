const request = require('request');

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
                `${data.weather_descriptions[0]}. It is currently ${data.temperature} out. It feels like ${data.feelslike} out! Humidity is  ${data.humidity}%!`
            );
        }
    })
};

module.exports = forecast;