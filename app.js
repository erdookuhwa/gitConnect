// now to time to interact w/ the collections in firebase
// db.collections('cafes').get() // if using just this, it is an async func hence returns a promise when completed so we need to tag on a .then an pass it a callback function to act on the snapshot which is received.

// db.collection('cafes').get().then((snapshot) => {
//     console.log(snapshot.docs)
// })

// to output the data in the page, we gotta reference the ul's id of cafe-list
const cafeList = document.getElementById("cafe-list")

// create element & render cafe
function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')

    li.setAttribute('data-id', doc.id) // to get the document's ID from firestore
    name.textContent = doc.data().name
    city.textContent = doc.data().city

    // next, gotta append the name & city to the li
    li.appendChild(name)
    li.appendChild(city)

    // lastly, gotta append the li we created to the ul element of cafeList
    cafeList.appendChild(li)
}

// to get the actual data in a doc...
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
    })
})