const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./api/routes/routes');
const connectToMongo = require('./api/dbConnection/connectMongoDB');

// MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// 

routes(app);

// Connection to Database
connectToMongo();
// 

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`Server listening on Port: ${port}`));
