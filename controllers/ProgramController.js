const Program = require("../models/Program")



const ProgramController = {
    
    async createProgram(req, res) {
        try {
            const program = await Program.create(req.body)
            res.status(201).send({msg: "Programa creada", program});
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "Ha habido un problema al crear el programa" });
        }
      },

      async getAll(req, res){
        try {
            const programs = await Program.find()
            res.status(200).send(programs)
        } catch(error){
            console.error(error)
        }
      },

        //PARA DATA - NO UTILIZAR EN FRONT

        async dataGetAll(req, res){
          try {
              const programs = await Program.find()
              res.status(200).send(programs)
          } catch(error){
              console.error(error)
          }
        },
    


}

module.exports = ProgramController