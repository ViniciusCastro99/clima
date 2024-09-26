// seleção
const searchBtn = document.querySelector("#search-btn")
let cityInput = document.querySelector("cities")

//funções

//Essa função pega as coordenadas das cidades disponiveis.
const getCoordinates = async () => {
    const city = document.querySelector("#cities").value.toLowerCase()
    let longitude
    let latitude
    const apiKey = `586e73232cfc9c8001a13c6de27daa72`
    url = `https://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${city}`

    try{
        const aswerCoordinate = await fetch(url)
        const dataCoordinate = await aswerCoordinate.json()

        latitude = dataCoordinate.data[0].latitude
        longitude = dataCoordinate.data[0].longitude

        return {longitude, latitude}


        
    }catch(error){
        alert(`Não foi possível encontrar as coordenadas para ${city}`)
    }
 

}

 //traduz a descrição do tempo para o português

const descriptionTranslated = (descriptionEnglish) =>{
    // let descriptionEnglish =  data.weather[0].description
    let descriptionPortuguese = ""
   
    switch(descriptionEnglish){
        case "clear sky":
            descriptionPortuguese = "céu limpo"
        break;
        case "few clouds":
            descriptionPortuguese = "poucas nuvens"
        break;
        case "scattered clouds":
            descriptionPortuguese = "nuvens quebradas"
        break;
        case "broken clouds":
            descriptionPortuguese = "nuvens esparsas"
        break;
        case "light rain":
            descriptionPortuguese = "chuva leve"
        break;
        case "moderate rain":
            descriptionPortuguese = "chuva moderada"
        break;
        case "heavy intensity rain":
            descriptionPortuguese = "chuva de alta intensidade"
        break;
        case "drizzle":
            descriptionPortuguese = "garoa"
        break;
        case "thunderstorm ":
            descriptionPortuguese = "tempestade"
        break;
        case "mist":
            descriptionPortuguese = "neblina"
        break;
        case "haze":
            descriptionPortuguese = "névoa"
        break;
        default:
            descriptionPortuguese = descriptionEnglish
        break;
     }

     return descriptionPortuguese
}

//Função assincrona para conseguir os dados da cidade:
const getTemperature = async () =>{
   
    let coordinates = await getCoordinates()


    if (!coordinates) {
        alert("Não foi possível obter as coordenadas da cidade.");
        return; // Saia da função se não conseguir obter coordenadas
    }

    const apiKey = `44baba1ca9d02b1f08fd1ffda5d0855b`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}&units=metric`;

    try{
        //Seleção de elementos para apresentação das informações:
        const city = document.querySelector("#chosen-city")
        const currentTemperature = document.querySelector("#current-temperature")
        const humidity = document.querySelector("#humidity")
        const description = document.querySelector("#description")

       //Mensagem de load, antes do êxito na resposta da API
        city.innerText = "Carregando..."
        currentTemperature.innerText = "Carregando..."
        humidity.innerText = "Carregando..."
        description.innerText = "Carregando..."
        initialMenssage = ""

        //Requisição uma resposta:
        const aswer = await fetch(url)
        //Conversão da resposta para json:
        const data = await aswer.json()

        const descriptionPortuguese = descriptionTranslated(data.weather[0].description)

        //Apresentação dos dados
        cityInput = document.querySelector("#cities")
        

        city.innerText = cityInput.value  
        currentTemperature.innerHTML = `<i class="bi bi-thermometer-half"></i> ${data.main.temp.toFixed(1)}°C`;
        humidity.innerHTML = `<i class="bi bi-droplet"></i> ${data.main.humidity} %`
        description.innerHTML = `<i class="bi bi-cloud-sun"></i> ${descriptionPortuguese}` 
    }catch(error){
        alert(`Erro: ${error}`)
    }
}

//Eventos

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    const span = document.querySelectorAll("span")
    const initialMenssage = document.querySelector("#initialMenssage")
    initialMenssage.classList.add("hide")
    span.forEach((span) => {
        span.classList.remove("hide")
    })
    getTemperature()
}) 

//Evento para tecla enter:
cityInput.addEventListener("keydown", (e) => {

    if(e.key === "enter"){
        e.preventDefault()
        searchBtn.click() //simula o clique no botão
    }
})
