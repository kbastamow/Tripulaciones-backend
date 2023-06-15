require("dotenv").config();
const Category = require("../models/Category")

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
const categoryData = [
    { name: "Marketing" },
    { name: "Finance and Investment" },
    { name: "Management Skills" },
    { name: "Business Management" },
    { name: "Tech" },
    { name: "Entrepreneurship" },
    { name: "Artificial Intelligence" },
    { name: "Crypto" },
    { name: "Sport" },
    { name: "Economy" },
    { name: "Networking" },
    { name: "Sustainability" },
    { name: "Design" },
    { name: "Music" },
    { name: "HR" },
    { name: "Employment" }
  ]

const seedCategories = async() => {
    const categories = await Category.insertMany(categoryData)
}

// connectToDatabase();

// seedCategories();
