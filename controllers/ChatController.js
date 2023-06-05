const User = require('../models/User');
const Chat = require("../models/chat");


const ChatController = {
  async create(req, res) {
    try {
      const chat = await Chat.create(req.body); // Crear el objeto chat antes del bucle

      req.body.users.forEach(async (userId) => {
        await User.findByIdAndUpdate(userId, { $push: { chat: chat._id } });
      });

      res.status(201).json({ message: "Chat creado", chat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor" });
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
      const { chatId } = req.params;

      // Buscar el chat por su ID
      const chat = await Chat.findById(chatId);

      // Validar si el chat existe
      if (!chat) {
        return res.status(404).json({ error: "Chat no encontrado" });
      }

      res.json({ chat });
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
};

module.exports = ChatController;
