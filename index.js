// env handled
import { configDotenv } from "dotenv";
configDotenv();

// db connection
import connectDB from "./dbconnect.js";
await connectDB();

// express app init
import app from "./app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App @ ${port}`);
});
