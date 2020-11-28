
console.log("Client side is here")

// fetch('http://localhost:3000/weather?address='+ location).then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//             console.log(location)
//         } else
//          {console.log(data) console.log(location)}
//     } )
// }

// )

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()




    messageOne.textContent = 'Loading'

    const location = search.value
    console.log(location)



    fetch('/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            console.log(data.error)
            console.log(location)
            messageTwo.textContent = 'Loading error'
        } else
         {console.log(data); 
          messageOne.textContent = ""  
          messageTwo.textContent = data.location + " " + data.climate + '.  Temperature is ' + data.temperature + ' but feels like ' + data.feels_like 
        }
    } )
}

)
} )