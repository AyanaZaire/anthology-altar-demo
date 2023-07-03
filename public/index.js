document.addEventListener("DOMContentLoaded", () => {
    loadPoems()
    let poemForm = document.getElementById("poem-form")
    poemForm.addEventListener("submit", (event) => {
        event.preventDefault()
        poemFormHandler()
    })
})

function loadPoems() {
    fetch("http://localhost:3000/poems")
    .then(response => response.json())
    .then(poems => {
        poems.forEach(poem => {
            displayPoem(poem)
        })
    })
}

function displayPoem(poem) {
    // display title, author, year in nav
    let navUl = document.querySelector("#nav-ul")
    let li =
    `<li>
        <a class="nav-link" href="#${poem.title}">${poem.title}</a>
        <p>${poem.author}<span>${poem.year}</span></p>
    </li>`
    navUl.innerHTML += li

    let dataSections = document.querySelector("#data-sections")
      let dataSection = 
      `<section class="data-section" id="${poem.title}">
          <div class="flex-container">
              <div class="flex-child">
                  <header>${poem.title}</header>
                  <p class="author">${poem.author}</p>
                  <p class="year">${poem.year}</p>
                  <p>${poem.poem}</p>
              </div>
              <div class="flex-child">
                  <div class="imagesDiv" id="imagesDiv-${poem._id}"></div>
              </div>
          </div>
          <div class="flex-container">
              <div class="flex-child">
                  <p class="citation">Citation</p>
              </div>
              <div class="flex-child">
                  <p class="citation-text">${poem.author}. <i>${poem.title}</i>. <a href="${poem.source}">${poem.book}</a>. ${poem.publisher}, ${poem.year}</p>
              </div>
          </div>
      </section>`
      dataSections.innerHTML += dataSection
      appendImages(poem)
}

function appendImages(poem) {
    let imagesDiv = document.getElementById(`imagesDiv-${poem._id}`)
    let imagesDivId = imagesDiv.id.split("-")[1]
    if(poem._id == imagesDivId) {
        poem.images.forEach(poemImage => {
            let image = `<a href="${poemImage}"><img src="${poemImage}" class="poet-image" alt="Scan of the poem ${poem.title} in the book ${poem.book}"/></a><br>`
            imagesDiv.innerHTML += image
        })
    }
}

function poemFormHandler() {
    let inputTitle = document.getElementById('title').value
    let inputAuthor = document.getElementById('author').value
    let inputPoem = document.getElementById('poem').value
    let inputSource = document.getElementById('source').value
    let inputBook = document.getElementById('book').value
    let inputPublisher = document.getElementById('publisher').value
    let inputYear = document.getElementById('year').value
    let inputImage = document.getElementById('image').value
    createPoem(inputTitle, inputAuthor, inputPoem, inputSource, inputBook, inputPublisher, inputYear, inputImage)
}

function createPoem(inputTitle, inputAuthor, inputPoem, inputSource, inputBook, inputPublisher, inputYear, inputImage) {
    fetch("http://localhost:3000/poems", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        title: inputTitle, 
        author: inputAuthor, 
        poem: inputPoem, 
        source: inputSource, 
        book: inputBook, 
        publisher: inputPublisher, 
        year: inputYear, 
        images: [inputImage]
    })
  })
  .then(response => response.json())
  .then(newPoem => {
    console.log(newPoem)
      if(!newPoem.error) {
        displayPoem(newPoem)
      } else {
        alert(newPoem.error.message)
      }
  })
}