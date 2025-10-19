// import mongoose, { mongo } from "mongoose";
// let PayrollDB = "mongodb://localhost:27017/db-PayrollSystem"

//  async function connectToDatabase()
// {
//     try
//     {
//         let connection = await  mongoose.connect(PayrollDB)
//         console.log("DataBase Connected", connection.connection.name);
//     }
//     catch(error)
//     {
//         console.log(error)
//     }
 

// }
// export { connectToDatabase} 
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Read DB URL from environment variable
const PayrollDB = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    const connection = await mongoose.connect(PayrollDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database Connected:", connection.connection.name);
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1); // Stop the app if DB fails to connect
  }
}

export { connectToDatabase };
