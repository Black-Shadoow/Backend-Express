
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({
    path: "./.env", // Ensure the path to your .env file is correct
});
connectDB();





//first Approach
/*
(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("ERR", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is running on http://itconnect:${process.env.PORT}`);
        });
    } catch (error) {
        console.log("error:", error);
        throw error;
    }
})();
*/
