// console.log('client side javascript')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherImage = document.querySelector('canvas')

messageOne.textContent = ''


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = searchElement.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.place_name
            messageTwo.textContent = data.forecast 

            // skycons
            weatherImage.id=data.icon
            var icons = new Skycons({"color": "orange"});
            icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
            icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
            icons.set("cloudy", Skycons.CLOUDY);
            icons.set("rain", Skycons.RAIN);
            icons.set("sleet", Skycons.SLEET);
            icons.set("snow", Skycons.SNOW);
            icons.set("clear-night", Skycons.CLEAR_NIGHT);
            icons.set("wind", Skycons.WIND);
            icons.set("fog", Skycons.FOG);
            icons.set("clear-day", Skycons.CLEAR_DAY);
            icons.play();
        }
    })
})
})
