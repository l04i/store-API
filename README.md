# Store-API

A Node.js API built for displaying and interacting with products stored in MongoDB. This API allows users to filter, sort, select specific fields, and paginate through products. Numeric filtering is also supported for properties like price and rating.

## Features

- **Display Products**: Retrieve all products from the MongoDB database.
- **Filtering**: Filter products based on specific fields (e.g., name, company, featured).
- **Sorting**: Sort products by fields like price, rating, etc.
- **Selecting Fields**: Select specific fields to return in the response (e.g., name, price).
- **Pagination**: Use skip/limit for paginated responses.
- **Numeric Filtering**: Filter products based on numeric values like price or rating.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for handling API routes and logic.
- **MongoDB**: NoSQL database for storing product data.
- **Mongoose**: MongoDB object modeling for Node.js.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.


### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/l04i/store-api.git
    cd store-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```
      PORT=3000
      MONGODB_URI=your_mongodb_connection_string
      ```

4. Start the application:
    ```bash
    npm start
    ```

5. Access the API:
   - You can now interact with the API by sending requests to `http://localhost:3000/api/v1/products`.

## API Endpoints

| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/api/v1/products`       | Retrieve all products               |


### Query Parameters for Filtering, Sorting, Selecting, and Pagination

- **Filtering**: Filter products by name, company, etc.
  - Example: `GET /api/v1/products?company=ikea`
- **Sorting**: Sort products by any field, e.g., price or rating.
  - Example: `GET /api/v1/products?sort=-price`
- **Selecting Fields**: Select specific fields to return (e.g., name, price).
  - Example: `GET /api/v1/products?fields=name,price`
- **Pagination**: Use page and limit to paginate results.
  - Example: `GET /api/v1/products?limit=10&page=2`
- **Numeric Filtering**: Filter products based on numeric values (e.g., price, rating).
  - Example: `GET /api/v1/products?numericFilters=price>=20`

### Example Request

```bash
GET /api/v1/products?company=ikea&sort=price&limit=5&numericFilters=price>=20
