let progressbar = document.querySelector('.progress-bar')
let form = document.querySelector('#location-form')
let inputField = document.querySelector('input')
let submitButton = document.querySelector('button')
let placeDetails = document.querySelector('#location-name')
let forecast = document.querySelector('#weather-details')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeatherDetails(inputField.value)
    toggleUIElements()
    placeDetails.innerHTML = ''
    forecast.innerHTML = ''
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
                forecast.innerHTML = value.error
                return
            }
            placeDetails.innerHTML = value.name
            forecast.innerHTML = value.forecast

        })
    })
}