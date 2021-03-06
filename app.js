// now to time to interact w/ the collections in firebase
// db.collections('cafes').get() // if using just this, it is an async func hence returns a promise when completed so we need to tag on a .then an pass it a callback function to act on the snapshot which is received.

// db.collection('cafes').get().then((snapshot) => {
//     console.log(snapshot.docs)
// })

// to output the data in the page, we gotta reference the ul's id of cafe-list
const cafeList = document.getElementById("cafe-list") // alternatively, can use doc.querySelector("#cafe-list")

// grab form id from index.html
const form = document.getElementById("add-cafe-form")

// create element & render cafe
function renderCafe(doc) {
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    // creating element for deleting
    let cross = document.createElement('div')

    li.setAttribute('data-id', doc.id) // to get the document's ID from firestore
    // setting the text contents for the elts we created
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = 'x'

    // next, gotta append the name & city to the li
    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    // lastly, gotta append the li we created to the ul element of cafeList
    cafeList.appendChild(li)

    // deleting data
    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute("data-id") // note that this 'data-id' is actually the doc.id... ref line 22
        db.collection('cafes').doc(id).delete()
    })
}

// to get the actual data in a doc...
db.collection('cafes').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc)
    })
})

// saving data to firestore
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });
    // to clear out fields after adding
    form.name.value = '';
    form.city.value = '';
})