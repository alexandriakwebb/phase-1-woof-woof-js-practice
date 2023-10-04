//fetches dogs and calls the function that will add each pup name to the dog bar
fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(data => data.forEach((pup) => {
        addDogToBar(pup)
    }))
    .catch(error => console.log(error))

//adds each pup to the dog bar with a <span> and listens for clicks on an individual dog; when a click is "heard" it calls the function to render that dog to the page
function addDogToBar(pup) {
    let dogBarSpan = document.createElement('span')
    dogBarSpan.textContent = pup.name
    dogBarSpan.setAttribute('id', `${pup.name}`)
    dogBarSpan.classList.add('dog-names')
    document.querySelector('#dog-bar').appendChild(dogBarSpan)
    dogBarSpan.addEventListener('click', event => {
        let dogToRender = event.target.id
        renderDog(dogToRender, pup)
    })
}

//renders clicked dog (see function above) to the page and controls dog status
function renderDog(dogToRender, pup) {
    let h2Name = document.createElement('h2')
    let img = document.createElement('img')
    let btnGoodBad = document.createElement('button')
    btnGoodBad.setAttribute('id', `${pup.id}`)
    btnGoodBad.dataset.status = pup.isGoodDog;

    h2Name.textContent = dogToRender
    if(pup.isGoodDog === true){
        btnGoodBad.textContent = 'Good Dog!'
    } else {btnGoodBad.textContent = 'Bad Dog!'}
    img.src = pup.image

    document.querySelector('#dog-info').appendChild(img)
    document.querySelector('#dog-info').appendChild(h2Name)
    document.querySelector('#dog-info').appendChild(btnGoodBad)

    btnGoodBad.addEventListener('click', (event) => {
        let isGoodDog = event.target.dataset.status
        console.log(isGoodDog)
        if(isGoodDog === 'true'){
            isGoodDog = 'false'
        } else { 
            isGoodDog = 'true'
        }
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: 'PATCH', 
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({isGoodDog})
        })
            .then(response => response.json())
            .then(isGoodDog => {
                if(btnGoodBad.textContent === 'Good Dog!') {
                    btnGoodBad.textContent = 'Bad Dog!'
                } else {
                    btnGoodBad.textContent = 'Good Dog!'
                }
            })
            .catch(error => console.log(error))
        console.log(isGoodDog)
    })
}


