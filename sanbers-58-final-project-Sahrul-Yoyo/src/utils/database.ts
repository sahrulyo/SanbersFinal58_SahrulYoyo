import mongoose from "mongoose";
import { DATABASE_URL } from "./env";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      autoIndex: true,
      dbName: "sanber-be-57",
      connectTimeoutMS: 10000,
    });
    console.log("Database connected");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to database:", error.message);
    } else {
      console.error("Error connecting to database:", error);
    }
    process.exit(1);
  }
};

export default connect;
