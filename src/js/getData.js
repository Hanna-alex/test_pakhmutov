//подключение к базе Данныx
const getData = () => {
  const booksContainer = document.querySelector('.books-list__list')

  const render = (data) => {
    booksContainer.innerHTML = '';
    data.forEach(book => {

      booksContainer.insertAdjacentHTML('beforeend', `
      <li class="books-list__item">
          <a href="#" class="books-list__link">
            <img
              src="${book.img}"
              alt="${book.alt}"
            />
          </a>
          <h2 class="books-list__title">${book.title}</h2>
        </li>`)
    })
  }



  const getBooks = () => {
    fetch('./db-books/books.json')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Данные получены с ошибкой')
        }
      })

      .then((data) => {
        render(data);
      })

      .catch((error) => {
        console.log(error.message);
      })
  }


  getBooks()

}

getData()
