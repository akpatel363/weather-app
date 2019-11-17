let progressbar = document.querySelector('.progress-bar')
let form = document.querySelector('#location-form')
let inputField = document.querySelector('input')
let submitButton = document.querySelector('button')
let placeDetails = document.querySelector('#location-name')
let forecast = document.querySelector('#weather-details')
let favicon = document.querySelector('i')
let errorMessage = document.querySelector('.error-message')
let message = document.querySelector('.message')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeatherDetails(inputField.value)
    toggleUIElements()
    placeDetails.innerHTML = ''
    forecast.innerHTML = ''
    favicon.className = ''
    if(!errorMessage.classList.contains('invisible'))
    {
        errorMessage.classList.add('invisible')
    }
})

function toggleUIElements() {
    submitButton.disabled = !submitButton.disabled
    inputField.disabled = !inputField.disabled
    progressbar.classList.toggle('progress-bar-hide')
}

function getWeatherDetails(query) {
    fetch('/weather?search=' + encodeURIComponent(query)).then((response) => {
        response.json().then((value) => {
            toggleUIElements()
            if (value.error) {
                message.innerHTML = value.error
                errorMessage.classList.toggle('invisible')
                return
            }
            placeDetails.innerHTML = value.name
            forecast.innerHTML = value.forecast
            favicon.className = "fav-icon fa fa-heart-o"
        })
    }).catch(error=>{
        toggleUIElements()
        message.innerHTML = error['message']
        errorMessage.classList.toggle('invisible')
    })
}

function addToFavourites(){
    var name = placeDetails.innerHTML
    var title = name.substring(0,name.indexOf(','))
    if(localStorage.getItem('favourites')==null){
        localStorage.setItem('favourites',JSON.stringify([{name,title}]))
    }else{
        var items = JSON.parse(localStorage.getItem('favourites'))
        var len = items.filter((item)=>{
            if(item.name==name)
                return item    
        }).length
        if(len==0){
            items.push({name,title})
            localStorage.setItem('favourites',JSON.stringify(items))
        }
    }
    favicon.className = 'fav-icon fa fa-heart'
}