console.log('script is running')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const weather = require('./utils/weather')


const app  = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlebars and views location
app.set('view engine', 'hbs') //setting up handlebars
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setting up static directory to serve 
app.use(express.static(publicDirectoryPath))




app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prateek',
        
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Prateek',
        Age:21,
        title:'About Me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'this is a help message from the main app.js.',
        title:'help',
        name:'Prateek'
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide a location'
        })
    }
    geocode.geoCode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
        if(error){
            return res.send({ error })
        } 
        weather.forecast(latitude,longitude,(error,{forecastData,icon})=>{
            if(error){
                return res.send({error})
            }
            res.send({forecast:forecastData,
                place_name,
                address:req.query.address,
                icon
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title:'404',
        name:'Prateek',
        message:'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        title:'404',
        name:'Prateek',
        message:'Page not found'
    })
})

// starting server
app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})

