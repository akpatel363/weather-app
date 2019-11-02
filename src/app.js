const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT||3000

const publicPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')

hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        baseClass:'active'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        aboutClass:'active'
    })
})

app.get('/favourites',(req,res)=>{
    res.render('favourites',{
        title:'Favourites',
        favouritesClass:'active'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'No Location Provided'
        })
    }
    geocode(req.query.search,(error,{lat,lon,name}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lon,lat,(forecast,error)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                name,
                forecast
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Page Not Found'
    })
})

app.listen(port,()=>{
    console.log("Server up And running on port ",port)
})