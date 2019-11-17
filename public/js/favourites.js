var cardContainer = document.querySelector('.card-container')
var favString = localStorage.getItem('favourites')
var favourites = []
if(favString==null)
{
    displayNoItems()
}else{
    favourites = JSON.parse(favString)
    if(favourites.length==0){
        displayNoItems()
    }else{
        addItem(0)
    }
}

async function addItem(index){
    var item = favourites[index]
    var card = document.createElement('div')
    card.classList.add('card')
    var closeIcon = document.createElement('i')
    closeIcon.className = 'fa fa-times close-icon'
    closeIcon.addEventListener('click',()=>{
        deleteData(index)
        card.remove()
    })
    card.appendChild(closeIcon)
    var title = document.createElement('h2')
    title.classList.add('card-title')
    title.innerHTML = item['title']
    card.appendChild(title)
    var text = document.createElement('p')
    text.classList.add('card-text')
    text.innerHTML = "Loading. Please Wait"
    card.appendChild(text)
    cardContainer.appendChild(card)
    text.innerHTML = await getWeatherDetails(text,item['name'])
    if(index<favourites.length-1){
        addItem(++index)
    }
}

function displayNoItems(){
    var message = document.createElement('h2')
    message.className = 'error-message'
    message.innerHTML = 'No Favourites Found.'
    cardContainer.appendChild(message)
}

async function getWeatherDetails(textElement,location){
    var res = await fetch('/weather?search='+encodeURIComponent(location))
    var json = await res.json()
    if(json.error)
        return json.error
    return json.forecast
}
function deleteData(index){
    favourites.splice(index-1,1)
    localStorage.setItem('favourites',JSON.stringify(favourites))
    if(favourites.length==0){
        displayNoItems()
    }
}