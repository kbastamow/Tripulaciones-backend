const User = require('../models/User');
const Chat = require("../models/Chat");
const { ObjectId } = require('bson');


const ChatController = {
  async create(req, res) {
    try {
      const chat = await Chat.create(req.body); // Crear el objeto chat antes del bucle
      req.body.users.forEach(async (userId) => {
        await User.findByIdAndUpdate(userId, { $push: { chat: chat._id } });
      });
      res.status(201).send({ message: "Chat creado", chat });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error interno del servidor" });
    }
  },

  async writeMsg(req, res) {
    try {
      const { chatId } = req.params;
      const { sender, content } = req.body;

      // Buscar el chat por su ID
      const chat = await Chat.findById(chatId);

      // Validar si el chat existe
      if (!chat) {
        return res.status(404).json({ error: "Chat no encontrado" });
      }

      // Agregar el nuevo mensaje al chat
      chat.messages.push({ sender, content });
      await chat.save();

      res.status(201).json({ message: "Mensaje enviado", chat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  async deleteMsg(req, res) {
    try {
      const { chatId, messageId } = req.params;
  
      // Buscar el chat por su ID
      const chat = await Chat.findById(chatId);
  
      // Validar si el chat existe
      if (!chat) {
        return res.status(404).json({ error: "Chat no encontrado" });
      }
  
      // Buscar el mensaje dentro del chat por su ID
      const message = chat.messages.id(messageId);
  
      // Validar si el mensaje existe
      if (!message) {
        return res.status(404).json({ error: "Mensaje no encontrado" });
      }
  
      // Eliminar el mensaje del chat
      chat.messages.pull(messageId);
      await chat.save();
  
      res.json({ message: "Mensaje eliminado", chat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  
  async deleteChat(req, res) {
    try {
      const { chatId } = req.params;

      // Buscar el chat por su ID y eliminarlo
      const deletedChat = await Chat.findByIdAndRemove(chatId);

      // Validar si el chat existe
      if (!deletedChat) {
        return res.status(404).json({ error: "Chat no encontrado" });
      }

      res.json({ message: "Chat eliminado", chat: deletedChat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  async getChatId(req, res) {
    try {
     console.log("getChatId, req.params", req.params._id)
      // Buscar el chat por su ID
      const chat = await Chat.findById(req.params)
      .populate({path: "userIds", select: "_id name"})
      .populate({path: "messages.sender", select: "_id name"});
      // Validar si el chat existe
      if (!chat) {
        console.log("error")
        return res.status(404).send({ msg: "Chat no encontrado" });
      }
      //Check que el usuario es parte del chat
      // if (!chat.usersIds.some(user => user._id.toString() === req.user._id.toString())) {
      //   console.log("no es tu chat");
      //   return res.status(401).send({ msg: "No estás en el chat" });
      // }
      
      res.send(chat)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  async getChatsByUserId(req, res) {
    try {
      const { userId } = req.params;

      // Buscar el usuario por su ID
      const user = await User.findById(userId).populate("chats");

      // Validar si el usuario existe
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json({ chats: user.chats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

async findOrCreate(req, res) {
  try {
    const you = req.user._id
    const otherUser = req.body.otherId
    if (!you || !otherUser) {
      return res.status(400).send({msg: "Datos de usuario undefined"})
    }

    const chat = await Chat.findOne({ userIds: { $all: [you, otherUser] }}).populate({path: "messages.sender", select: "_id name"})
    if (chat) {
      console.log("old chat", chat)
      res.send(chat)
    } else {
    const userIds = [you, otherUser];
    const newChat = await Chat.create( {name: "Chat", userIds})
    userIds.forEach(async(user) => {
      await User.findByIdAndUpdate(user, { $push: { chatIds: newChat._id } });
    })
    console.log("new chat", newChat)
    res.status(201).send({msg:"new chat msg", newChat})  
  }

} catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error interno del servidor" });
  }

}


};

module.exports = ChatController;
