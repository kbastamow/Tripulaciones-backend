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
const Chat = require("./models/Chat");
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle chat messages
  socket.on('message', async (data) => {
    console.log('data:', data);

    // Save the message to the database using the Chat model
    try {
      //Save to DB
      const chat = await Chat.findById(data._id); 
      if (!chat) {
        console.log('Chat not found');
        return;
      }
      chat.messages.push({sender: data.sender, content: data.content, timestamp: data.timestamp});
      // Save the updated chat
      await chat.save();
      
      // Broadcast the message to all connected clients
      io.emit('message', data);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

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
