const axios = require("axios")
const Lanzadera = require("../models/Lanzadera")
const mongoose = require("mongoose");

const {dbConnection} = require ("../config/config");

/*Establish connection: check package.json: "seed": "node ./seeders/seedLanzadera.js"
  npm run NAME
*/

let isConnected = false;

const connectToDatabase = async() => {
    if (isConnected) {
      console.log('Already connected to MongoDB');
      return;
    }
    try {
      dbConnection()
      isConnected = true;
      console.log('seedLanzadera Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}

  connectToDatabase();

 const getStartups = async() => {
    try {
        const res = await axios.get() //Url to base de datos de data
        console.log(res.data)
        // const startups = await create.Lanzadera()    res.data? What format?
        // to be continued
          
    
    } catch (error) {
        
    } 

 }
