const axios = require("axios")
require("dotenv").config();
const User = require("../models/User")
const Category = require("../models/Category")
const Program = require("../models/Program")
const bcrypt = require("bcryptjs");



const {dbConnection} = require ("../config/config");

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

//HASH PASSWORD
const password = "1234"
const hashedPassword = bcrypt.hashSync(password, 10);

const categoryNames = [
    "Marketing",
    "Finance and Investment",
    "Management Skills",
    "Business Management",
    "Tech",
    "Entrepreneurship",
    "Artificial Intelligence",
    "Crypto",
    "Sport",
    "Economy",
    "Networking",
    "Sustainability",
    "Design",
    "Music",
    "HR",
    "Employment"
  ];



const seedUsers = async() => {
    try {
        const res = await axios.get("http://13.53.184.159/get_db_students") //Url to base de datos de data
        const users = res.data
        console.log(users[0])

        const getCategoryObjectIds = async (categoryNames) => {
            try {
              const categoryObjectIds = await Promise.all(
                categoryNames.map(async (categoryName) => {
                  const category = await Category.findOne({ name: categoryName });
                  return category ? category._id : null;
                })
              );
              return categoryObjectIds.filter((objectId) => objectId !== null);
            } catch (error) {
              console.error("Error retrieving category ObjectIds:", error);
              return [];
            }
          };

          const getProgramObjectId = async (programName) => {
            try {
              const program = await Program.findOne({ name: programName });
              return program ? program._id : null;
            } catch (error) {
              console.error("Error retrieving program ObjectId:", error);
              return null;
            }
          };
          
          // Usage
        //Specify the number of users to seed:  users.slice(0, 10)
        let seedData = users.slice(0, 49).map(async(user) => {
            let categoryIdArray = await getCategoryObjectIds(user.category)
            let programObject = await getProgramObjectId(user.programme)
        
            let data = {
                name: user.name, 
                surname: user.surname, 
                age: user.age,
                gender: user.gender,
                year: user.year,
                email: "0" + user.email,  //ADD 0 in front so no email is real
                password: hashedPassword,
                confirmed: true,
                categoryIds: categoryIdArray,
                program: programObject
            }
            console.log(data)
            await User.create(data)
            }
            )

            } catch(error) {
               console.error
            }}


//  dbConnection()
//  seedUsers()

