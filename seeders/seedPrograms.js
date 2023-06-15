require("dotenv").config();
const Program = require("../models/Program")

const {dbConnection} = require ("../config/config");

/*Establish connection: check package.json: "seed": "node ./seeders/seedLanzadera.js"
  npm run NAME
*/

let isConnected = false;

const connectToDatabase = async() => {
    if (isConnected) {
      return;
    }
    try {
      dbConnection()
      isConnected = true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}
 
// Data array containing seed data - documents organized by Model
const programData = [
    { name: "BSc in Engineering and Management", translation: "Grado Ingeniería y Gestión Empresarial", type: "Bachelor" },
    { name: "BBA in Business Administration", translation: "Grado ADE Creación y Dirección de Empresas", type: "Bachelor" },
    { name: "Master Marketing and Digital Sales", translation: "Master en Marketing Digital", type: "Master" },
    { name: "Master Data Analytics", translation: "Master Data Analytics", type: "Master" },
    { name: "Master Finance", translation: "Master Fintech & Business Intelligence", type: "Master" },
    { name: "MBA Junior", translation: "MBA Junior", type: "Master" },
    { name: "Bootcamp Data Science", translation: "Bootcamp Data Science", type: "Bootcamp" },
    { name: "Bootcamp Full Stack", translation: "Bootcamp Full Stack", type: "Bootcamp" },
    { name: "Bootcamp UX/ UI", translation: "Bootcamp UX/ UI", type: "Bootcamp" },
    { name: "Bootcamp Cibersecurity", translation: "Bootcamp Cybersecurity", type: "Bootcamp" },
    { name: "Bootcamp Cloud & DevOps", translation: "Bootcamp Cloud & DevOps", type: "Bootcamp" }
  ]

const seedProgram = async() => {
    const programs = await Program.insertMany(programData)
    console.log(programs)
}

// connectToDatabase();

// seedProgram();
