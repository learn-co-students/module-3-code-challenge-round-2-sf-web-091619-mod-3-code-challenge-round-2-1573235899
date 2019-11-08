
//fetch all beers and render the list of all beer names on left-hand side
fetch("http://localhost:3000/beers")
    .then(response => response.json())
    .then(allBeersJson => {
        allBeersJson.map(beer => {
            const beerName = beer.name 
            // const beerTagline = beer.tagline 
            // const beerFirstBrewed = beer.first_brewed 
            // const beerDescription = beer.description 
            // const beerImageUrl = beer.image_url
            // const beerFoodPairing = beer.food_pairing 
            // const beerBrewersTips = beer.brewers_tips
            // const beerContributedBy = beer.contributed_by

        
            const beerList = document.getElementById('list-group')
            const beerNameElement = document.createElement('li')
            beerNameElement.id = beer.id
            beerNameElement.className = "list-group-item"
            beerNameElement.textContent = beerName
            beerList.appendChild(beerNameElement)
        })
    })

//fetch a single beer => add listener, fetch beer info, and make changes to DOM
const beerList = document.getElementById('list-group') 
beerList.addEventListener('click', function(event) {
    console.log(event.target)
    const beerId = event.target.id
    const eachBeerDetails = document.getElementById('beer-detail')
    if(event.target.className === "list-group-item"){
        fetch(`http://localhost:3000/beers/${beerId}`)
            .then(response => response.json())
            .then(beer => {
                const beerTagline = beer.tagline 
                const beerDescription = beer.description 
                const beerImageUrl = beer.image_url

                eachBeerDetails.innerHTML = ''
                
                const beerNameElement = document.createElement('h1')
                beerNameElement.textContent = beer.name
                eachBeerDetails.appendChild(beerNameElement)

                const beerImageUrlElement = document.createElement('img')
                beerImageUrlElement.src = beerImageUrl
                eachBeerDetails.appendChild(beerImageUrlElement)

                const beerTaglineElement = document.createElement('h3')
                beerTaglineElement.textContent = beerTagline
                eachBeerDetails.appendChild(beerTaglineElement)
                
                const beerDescriptionElement = document.createElement('textarea')
                beerDescriptionElement.textContent = beerDescription
                eachBeerDetails.appendChild(beerDescriptionElement)

                const beerButton = document.createElement('button')
                beerButton.id = beer.id
                beerButton.class = "btn btn-info"
                beerButton.textContent = "Save"
                eachBeerDetails.appendChild(beerButton)

                // function renderBeer() {
                //     return `
                //     <h1>${beer.name}</h1>
                //     <img src="<${beerImageUrl}>">
                //     <h3>${beerTagline}</h3>
                //     <textarea>${beerDescription}</textarea>
                //     <button id="edit-beer" class="btn btn-info">Save</button>
                //     `
                //     }
                
                // eachBeerDetails.appendChild(renderBeer()) -> can't append function, which consists of multiple nodes
            })
    }
})

//editing beer details
const eachBeerDetails = document.getElementById('beer-detail')

eachBeerDetails.addEventListener('click', function(event) {
    console.log(event.target)
    const beerId = event.target.id
    const beerDescription = event.target.previousSibling.textContent
    // debugger
    // console.log(beerDescription)

        //manipulating DOM
        console.log(beerDescription)
        //persisting description to DB
        fetch(`http://localhost:3000/beers/${beerId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                description: beerDescription 
            })
        })
    
})
