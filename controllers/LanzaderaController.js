const Lanzadera = require("../models/Lanzadera")



const LanzaderaController = {

    async getAll(req, res) {
        try {
            const startups = await Lanzadera.find()
            console.log(startups)
            res.status(200).send(startups)
        } catch (error) {
            console.error(error)
            res.send("Error del servidor")
            
        }
    },

    
  //pasa busqueda por query: /lanzadera/getAndLimit?page=3&limit=20
    async getAndLimit(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;  
            const startups = await Lanzadera.find()
            .limit(10)
            .skip((page - 1) * limit)

            res.status(200).send(startups)
        } catch (error) {
            console.error(error)
            res.send("Error del servidor")    
        }
    },


}


module.exports = LanzaderaController;