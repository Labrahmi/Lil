
# Authors
- [x] Add author
  - `POST: /api/authors/add`
- [x] Update of author
  - `PUT: /api/authors/update`
- [x] Returning all books by author _(* support pagination)_
  - `GET: /api/authors/:id/books`

# Books
- [x] Adding one or more books in one request.
  - `POST: /api/books/add`
- [x] Deleting a book
  - `DELETE: /api/books/:id/delete`
- [ ] return all books _(* support pagination)_
  - `GET: /api/books`
- [ ] Returning books according to values that appear under the name _(* support pagination)_
  - `GET: /api/books/`
- [ ] Returning books by genre _(* support pagination)_
  - `GET: /api/books/`
- [ ] Returning books by publishingYear in the range _(* support pagination)_
  - `GET: /api/books/`
- [ ] Returning books according to the country of the author _(* support pagination)_
  - `GET: /api/books/`

# Orders
- [ ] Each order represents the purchase of one or more books
  - `GET: /api/yes`
- [ ] Adding an order (the quantity of the books must be updated accordingly, and you cannot buy if there is no book in stock)
  - `GET: /api/yes`
- [ ] Finding the order with maximum totalPrice in a date range
  - `GET: /api/yes`
- [ ] Finding the 3 most popular genres in a date range
  - `GET: /api/yes`
- [ ] Finding the total profit in a date range
  - `GET: /api/yes`
- [ ] Finding the 5 most bought authors in a date range
  - `GET: /api/yes`