document.addEventListener("DOMContentLoaded", () => {
    //GET ramen photos
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            addRamenPhoto(item)
        })
    })
    //add new ramen
    const newRamenForm = document.querySelector('#new-ramen')
    newRamenForm.addEventListener('submit', submitRamen)
})

function submitRamen(event){
    event.preventDefault()
    let ramenObj = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target.comment.value
    }
    addRamenPhoto(ramenObj)
    postRamen(ramenObj)
}

function postRamen(ramenData){
    fetch(`http://localhost:3000/ramens/${ramenObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ramenData)
    })
    .then(res => res.json())
    .then(ramenData => console.log(ramenData))
}

function addRamenPhoto(item){
    const photoContainer = document.getElementById('ramen-menu')
    const ramenPhoto = document.createElement('img')
    ramenPhoto.src = item.image
    ramenPhoto.classList.add('ramen-photo')
    photoContainer.appendChild(ramenPhoto)
    //click on photo
    ramenPhoto.addEventListener('click', () => {
        const featurePhoto = document.querySelector('.detail-image')
        const featurePhotoName = document.querySelector('.name')
        const featurePhotoRestaurant = document.querySelector('.restaurant')
        const featurePhotoRating = document.querySelector('#rating-display')
        const featurePhotoComment = document.querySelector('#comment-display')
        featurePhoto.src = item.image
        featurePhotoName.innerText = item.name
        featurePhotoRestaurant.innerText = item.restaurant
        featurePhotoRating.innerText = item.rating
        featurePhotoComment.innerText = item.comment
    })
}
