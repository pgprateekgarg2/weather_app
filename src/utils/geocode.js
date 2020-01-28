// mapbox api


const request = require('request')

// Synchronous approach
// geocoding
// const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGdwcmF0ZWVrZ2FyZzIiLCJhIjoiY2s1cnYxeWVmMDR0bTNwcDZna2pqc2VicSJ9.sG1dg9sMr95NdyoOoqN7ZA&limit=1&autocomplete=true'
// returns the longitude and latitude for the given location
// request({url:urlMapBox,json:true},(error,response)=>{
//    if(error){
//       console.log('Unable to connect to the weather service')
//    }
//    // this will handle if the location entered is wrong. if the location entered is wrong then the features object points to an empty array 
//    else if (response.body.features.length == 0){
//       console.log('Unable to find location')
//    } else {
//       const place_name = response.body.features[0].place_name
//       const longitude = response.body.features[0].center[0]
//       const latitude = response.body.features[0].center[1]
//       console.log('Longitude for '+place_name+' is '+longitude+' and latitude for the same place is '+latitude+'.')
//    }
// })

//asynchronous approach
// we used encodeURIComponent() to handle the problems like if someone searches for the location with the special character then it will convert it into the suitable url format hence the program from being crashed
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGdwcmF0ZWVrZ2FyZzIiLCJhIjoiY2s1cnYxeWVmMDR0bTNwcDZna2pqc2VicSJ9.sG1dg9sMr95NdyoOoqN7ZA&limit=1&autocomplete=true'
 
    request({ url, json: true }, (error, {body}) => {
       if (error) {
          callback('Unable to connect to Location service', undefined)
       } else if (body.features.length === 0) {
          callback('Unable to find the location', undefined)
       }
       else {
          callback(undefined, {
             place_name: body.features[0].place_name,
             longitude: body.features[0].center[0],
             latitude: body.features[0].center[1]
          })
       }
    })
 }

 module.exports={
     geoCode
 }

//  example to use geocode asynchronous approach
// geoCode('haryana', (error, data) => {
//     if (error) {
//        console.log('Error :', error)
//     } else {
//        console.log('Longitude and Latitude for ' + data.place_name + ' are ' + data.longitude + ' and ' + data.latitude + ' respectively')
//     }
//  })