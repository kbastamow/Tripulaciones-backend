const express = require("express");
const {dbConnection} = require ("./config/config");
require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT || 3000;

const { handleTypeError }= require('./middlewares/errors');
const app = express();
app.use(cors());



app.use(cors())

app.use(express.json());
app.use(express.static("./public"));

app.use("/events", require("./routes/events"));
app.use('/categories',require('./routes/categories'));
app.use('/users',require('./routes/users'))
app.use('/chats',require('./routes/chats'))
app.use("/lanzadera", require("./routes/lanzadera"))
app.use("/programs", require("./routes/programs"))

app.use(handleTypeError)

dbConnection();


app.listen(PORT, () => 
console.log(`Server started on port ${PORT}`)
);
