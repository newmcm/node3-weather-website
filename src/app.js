//server side javascrip

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather Dog',
        name: 'Brownies'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Brownie'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        msg: 'We will help you',
        name: 'community'
    });
});



app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"error!",
            msg:"you must provide an address"
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:"error!",
                msg:error
            });
        } 
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:"error encountered!",
                    msg:error
                });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg:'Help article not found',
        name:'Ming Chuan'
    });
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        });
    }
    
    console.log((req.query.search));
    res.send({
        product:{}
    });

    

});


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        msg:'Page not found',
        name:'Ming Chuan'

    });
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}.`);
});

