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
   const users = res.data
   console.log(users[0])
  //  console.log(res.data.slice(0,5))
  //  const seed = await Lanzadera.insertMany(data)

 } catch (error) {
  console.error(error)
  
 }
}



//   const processData = async (data) => {
//     try {
//       const result = await create.Lanzadera.insertMany(data);
//       console.log("Documents created:");
//     } catch (error) {
//       console.error("Error creating documents:", error);
//     }
//   };

// const seedStartups = () => {
//   console.log("File path:", __dirname + "/path/to/startups_by_rows.json");
//   fs.readFile("./seeders/startups_by_rows.json", "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading file:", err);
//     return;
//   }
//   try {
//     const jsonData = JSON.parse(data);
//     const processedData = jsonData.slice[0,2].map((item) => {  //DECIDE HERE WHAT TO INCLUDe
//       const { logo_link, ...rest } = item;
//       return { logo: logo_link, ...rest };
//     });
//     console.log(processedData)
//     // processData(processedData);   //DECIDE HERE WHAT TO INCLUDe
//   } catch (error) {
//     console.error("Error parsing JSON data:", error);
//   }
// })
// };





//  const getStartups = async() => {
//     try {
//         const res = await axios.get() //Url to base de datos de data
//         console.log(res.data)
//         // const startups = await create.Lanzadera()    res.data? What format?
//         // to be continued
          
    
//     } catch (error) {
        
//     } 

//  }


// connectToDatabase();
// seedLanzadera()

