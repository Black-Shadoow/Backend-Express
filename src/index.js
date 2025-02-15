import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({
    path: "./.env", // Ensure the path to your .env file is correct
});

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running at Port http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed!...", err);
    });



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
