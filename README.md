
# Authors
- [x] Added author
  - `POST: /api/authors/add`
- [ ] Update of author
  - `PUT: /api/authors/update`
- [ ] Returning all books by author *
  - `GET /api/authors/:id/books`

# Books
- Adding one or more books in one request. Make sure that at the time of adding the book its author exists
- Deleting a book
- return all books *
- Returning books according to values that appear under the name *
- Returning books by genre *
- Returning books by publishingYear in the range *
- Returning books according to the country of the author *

# Orders
- Each order represents the purchase of one or more books
- Adding an order (the quantity of the books must be updated accordingly, and you cannot buy if there is no book in stock)
- Finding the order with maximum totalPrice in a date range
- Finding the 3 most popular genres in a date range
- Finding the total profit in a date range
- Finding the 5 most bought authors in a date range