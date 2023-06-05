const express = require("express");
const {dbConnection} = require ("./config/config");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { handleTypeError }= require('./middlewares/errors');
const app = express();

app.use(express.json());

app.use('/categories',require('./routes/categories'));
app.use('/users',require('./routes/users'))

app.use(handleTypeError)

dbConnection();


app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`)
);
