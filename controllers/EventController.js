const Event = require("../models/Event");
const Category = require("../models/Category");
const User = require("../models/User");
const axios = require("axios")

const EventController = {
  async createEvent(req, res) {
    try {
      const event = await Event.create(req.body)
      
      req.body.categoryIds.forEach(async(catId) => await Category.findByIdAndUpdate(
        catId,
        { $push: { eventIds: event._id } },
        {new : true}
      )) 
      res.status(201).send({ message: "Evento creado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un problema al crear el evento" });
    }
  },

  async updateEvent(req, res) {
    try {
      const event = await Event.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );
      res.send({ message: "Evento actualizado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Ha habido un problema al actualizar el evento' })
    }
  },

  async joinEvent(req,res) {
    try {
     let event = await Event.findById(req.params._id)
    
     if (event.userIds.includes(req.user._id)) {
      res.status(400).send("Ya estás apuntada al evento")
     } else {
       event.userIds.push(req.user._id)
       await event.save()
       
       const user = await User.findByIdAndUpdate(req.user._id,
        {$push: {eventIds: req.params._id}},
        )
        event = await Event.findById(req.params._id)
        .populate("categoryIds")
        .populate("userIds");

        res.send({msg: "Te has apuntado al evento", event})
     }
  } catch (error) {
    res.send(error)
  }
  }, 


  async deleteEvent(req, res) {
    try {
      const event = await Event.findByIdAndDelete(req.params._id);
      res.send({ message: "Evento borrado correctamente", event });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al borrar el evento",
      });
    }
  },

  async getAllEvents(req, res) {
    try {
      const currentDate = new Date();
      const { page = 1, limit = 10 } = req.query;

      const events = await Event.find( {
        date: { $gt: currentDate }  //date in the future
      })
      .sort({ date: 1 })
      .populate({path:"categoryIds", select: "name"})
        // .limit(limit)
        // .skip((page - 1) * limit);
       res.status(201).send(events);
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar los eventos",
      });
    }
  },
  
  async getById(req, res) {
    try {
      const event = await Event.findById(req.params._id)
      .populate("categoryIds")
      .populate("userIds")
      res.status(200).send(event)
      
    } catch (error) {
      console.error(error)
      res.status(500).send({msg: "Error en mostrar el evento"})
      
    }

  },

  async getMyEvents(req, res){
    try {
      const currentDate = new Date();
      const events = await Event.find(
        {
        userIds: { $in: [req.user._id] },  //event that user is attending
        date: { $gt: currentDate }  //date in the future
      })
      .sort({ date: 1 });
      res.status(200).send(events)
    } catch (error) {
      console.error(error)
      res.send({msg: "Error en mostrar tus eventos"})
    }
   
  },

  async getRecommendations(req,res) {
    try {
      const response= await axios.get("http://13.50.242.255/get_recommendation_events?requested_student_id=" + req.user._id)
      res.send(response.data)
    } catch (error) {
      console.error(error)
      res.send(error)
    }
  },


//PARA DATA - NO UTILIZAR EN FRONT
 async dataGetAll(req, res) {
    try {
      const events = await Event.find()
      res.send(events);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

};



module.exports = EventController;
