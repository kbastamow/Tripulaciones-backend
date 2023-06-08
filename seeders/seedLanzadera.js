const axios = require("axios")
const Lanzadera = require("../models/Lanzadera")
const mongoose = require("mongoose");
const fs = require("fs");

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

const seedLanzadera = async() => {
 try {
   const res = await axios.get("http://13.48.25.210/get_scrap_startups")
   const startups = res.data
   console.log("length:", res.data.name)

    const names = Object.values(startups.name);
    const phases = Object.values(startups.phase);
    const descriptions = Object.values(startups.description);
    const topicArrays = Object.values(startups.topics);
    const urls = Object.values(startups.url);
    const logos = Object.values(startups.logo_link);

   for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const phase = phases[i];
    const description = descriptions[i]
    const topics = topicArrays[i];
    const url = urls[i];
    const logo = logos[i];
  
    // Create a new instance of the Lanzadera model with the column data
    const newLanzadera = new Lanzadera({
      name: name,
      phase: phase,
      description: description,
      topics: topics,
      url:url,
      logo: logo,
    });

    console.log(newLanzadera)
  // Save the newLanzadera instance to the database
    await newLanzadera.save();
  }

  console.log("Data inserted successfully!");
} catch (error) {
  console.error(error);
}
};





// connectToDatabase();
// seedLanzadera()

