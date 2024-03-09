# Bookstore API

## Description
This is a RESTful API for a bookstore. The API is built using Node.js, Express.js, and MongoDB. The API provides endpoints for managing books, authors, and orders.

## Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. copy the .env.example file to .env
```bash
cp .env.example .env
```
4. Run `npm start` to start the server

## Usage
The API provides the following endpoints:

### Authors
- [x] Return all authors _(* support pagination)_
  - `GET: /api/authors`
- [x] Add author
  - `POST: /api/authors/add`
- [x] Update of author
  - `PUT: /api/authors/update`
- [x] Returning all books by author _(* support pagination)_
  - `GET: /api/authors/:id/books`

### Books
- [x] Adding one or more books in one request.
  - `POST: /api/books/add`
- [x] Deleting a book
  - `DELETE: /api/books/:id/delete`
- [x] return all books _(* support pagination)_
  - `GET: /api/books`
- [x] Returning books according to values that appear under the name _(* support pagination)_
  - `GET: /api/books/search`
- [x] Returning books by genre _(* support pagination)_
  - `GET: /api/books/genre/:genre`
- [x] Returning books by publishingYear in the range _(* support pagination)_
  - `GET: /api/books/publishingYear`
- [x] Returning books according to the country of the author _(* support pagination)_
  - `GET: /api/books/author/country/:country`

### Orders
- [x] Returning all orders
  - `GET: /api/orders`
- [x] Adding an Order
  - `POST: /api/orders/add`
- [x] Finding the Order with Maximum totalPrice in a Date Range
  - `GET: /api/orders/maxTotalPrice`
- [x] Finding the 3 Most Popular Genres in a Date Range
  - `GET: /api/orders/genres/popular`
- [x] Finding Total Profit in a Date Range
  - `GET: /api/orders/profit`
- [x] Finding the 5 Most Bought Authors in a Date Range
  - `GET: /api/orders/authors/popular`
