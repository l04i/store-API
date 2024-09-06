require('dotenv').config();
require('express-async-errors');
const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');


const app = express();
const port = process.env.PORT || 3000


app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Stores Api</h1> <a href ="/api/v1/products" > Products</a>');
})

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server Listening on port ${port} `));
    }
    catch (err) {
        console.log(err)
    }
}

start();