// dark sky api 

const request = require('request')


//synchronous way
// const url = 'https://api.darksky.net/forecast/8eab4480e131811854102b088b36003f/29.3909,76.9635'
// this is the invalid url to test whether response.body contains any error object to handle errors other than os errors like network connection lost
// const url = 'https://api.darksky.net/forecast/8eab4480e131811854102b088b36003f/29.3909'

// request({ url: url , json: true}, (error, response)=>{
//    // if we have value for error then we will not have the value for response and if we have value for response the we will not have the value for error
//    if(error){
//       console.log('Unable to connect to weather service!')
//    }
//    //this is to handle errors other than os errors like network connection lost 
//    else if(response.body.error){
//       console.log('unable to find location')
//    } else {
//    console.log(response.body.daily.data[0].summary+' It is currently '+response.body.currently.precipProbability+'% chances of rain')

//    }
// }) 


// asynchronous way
// const forecast = (latitude,longitude,callback)=>{

//     const url = 'https://api.darksky.net/forecast/8eab4480e131811854102b088b36003f/'+latitude+','+longitude
//     request({url:url, json:true},(error,response)=>{
//         if(error){
//             callback('Unable to connect to the weather service',undefined)
//         } else if(response.body.error){
//             callback('Unable to find the location',undefined)
//         } else{
//             callback(undefined,{
//                 timezone:response.body.timezone,
//                 summary: response.body.daily.data[0].summary,
//                 chanceOfRain:response.body.currently.precipProbability,
//                 temperature: response.body.currently.temperature 
//             })
//         }
//     })

// }

// destructured
const forecast = (latitude,longitude,callback)=>{

    const url = 'https://api.darksky.net/forecast/8eab4480e131811854102b088b36003f/'+latitude+','+longitude
    request({ url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the weather service',undefined)
        } else if(body.error){
            callback('Unable to find the location',undefined)
        } else{
            callback(undefined,{
                icon:body.currently.icon,
                forecastData:body.daily.data[0].summary+' It is currently '+body.currently.temperature+' out there. There is a '+body.currently.precipProbability+' chance of rain'
            })
        }
    })

}


module.exports ={
    forecast
}