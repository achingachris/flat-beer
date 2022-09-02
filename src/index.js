const apiURL = ' http://localhost:3000'

// getting all beers from json-server
getAllBeers = () => {
  fetch(`${apiURL}/beers`)
    .then((response) => response.json())
    .then((beers) => {
      document.getElementById('beer-list').innerHTML = beers
        .map(
          (beer) => `<li onClick="getSingleBeer(${beer.id})">${beer.name}</li>`
        )
        .join('')
    })
}

// get single beer from json-server
getSingleBeer = (id) => {
  fetch(`${apiURL}/beers/${id}`)
    .then((response) => response.json())
    .then((beer) => {
      console.log(beer)
      document.getElementById('beer-name').innerHTML = beer.name
      document.getElementById('beer-image').src = beer.image_url
      document.getElementById('beer-description').innerHTML = beer.description
      document.getElementById('review-list').innerHTML = beer.reviews
        .map((review) => `<li>${review}</li>`)
        .join('')
    })
}

// add eventlistenser for when the page is loaded
window.addEventListener('load', () => {
  getAllBeers()
  getSingleBeer(5)

  let descriptionForm = document.getElementById('description-form'),
    reviewForm = document.getElementById('review-form')

  descriptionForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target
    document.getElementById('beer-description').innerHTML =
      form.description.value
    form.reset()
  })

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = e.target
    document.getElementById(
      'review-list'
    ).innerHTML += `<li>${form.review.value}</li>`
    form.reset()
  })
})
