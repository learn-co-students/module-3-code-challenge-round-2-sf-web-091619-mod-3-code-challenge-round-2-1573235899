const listTag = document.querySelector('#list-group')
const detailDiv = document.querySelector('#beer-detail')

// Fetching All beers
fetch('http://localhost:3000/beers')
.then(resp => resp.json())
.then(beers => {
    beers.map(beer => {
        listTag.innerHTML += renderSingleBeer(beer)
    })
})

function renderSingleBeer(beer){
    return `
    <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

//Display Single Beer

listTag.addEventListener('click', e => {
    const beerId = e.target.dataset.id

    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(resp => resp.json())
    .then(beer => {
        detailDiv.innerHTML = renderDisplayBeer(beer)
    })
})

function renderDisplayBeer(beer){
return `
<h1>${beer.name}</h1>
<img src="${beer.image_url}">
<h3>${beer.tagline}</h3>
<textarea>${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
  Save
</button>
`    
}

// EDIT beer detail

detailDiv.addEventListener('click', e => {
    if (e.target.className === "btn btn-info"){

        const beerId = e.target.dataset.id
        const textTag = e.target.parentElement.querySelector('textarea')



        fetch(`http://localhost:3000/beers/${beerId}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            description: textTag.value
          })
        })
        .then(resp => resp.json())
        .then(beer => {
            detailDiv.innerHTML = renderDisplayBeer(beer)
        })

    }
})