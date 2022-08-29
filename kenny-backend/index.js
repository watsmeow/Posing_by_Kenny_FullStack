const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan');
const connectDB = require('./server/database/connection');
const cors = require('cors');

const userRoute = require('./server/routes/users');
const authRoute = require('./server/routes/auth');
const productsRoute = require('./server/routes/product');
const cartsRoute = require('./server/routes/cart');
const ordersRoute = require('./server/routes/order');
const stripeRoute = require('./server/routes/stripe');



const app = express();

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 3000

//MIDDLEWARE
//logging all requests made to server on the terminal
app.use(morgan('tiny'));

app.use(express.json());

app.use(cors());

//routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/carts', cartsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/checkout', stripeRoute);


//conect to Mongo DB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http:localhost:${PORT}`)
});


