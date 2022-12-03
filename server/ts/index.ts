import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

// Middle ware
app.use(bodyParser.json());
app.use(cors());

// Routes
import Feed from "./routes/api/Feed";

app.use("/api/feed", Feed);


const port = dotenv.config().parsed?.PORT || 5000;

app.listen(port, () => {
    console.log(`[SERVER] Started on port ${port}`);
});