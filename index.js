const express = require("express");
const {dbConnection} = require ("./config/config");
require("dotenv").config();
const cors = require("cors")
const PORT = process.env.PORT || 3000;

const { handleTypeError }= require('./middlewares/errors');
const app = express();
app.use(cors());

//SOCKET
const http = require('http');
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Replace with the appropriate frontend URL
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
  }
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle chat messages
    socket.on('message', (data) => {
        console.log('data:', data);
      // Broadcast the message to all connected clients
      io.emit('message', data);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });















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


server.listen(PORT, () => 
console.log(`Server started on port ${PORT}`)
);
