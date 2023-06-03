const express = require("express");
const {dbConnection} = require ("./config/config");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/categories',require('./routes/categories'))

dbConnection();


app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`)
);
