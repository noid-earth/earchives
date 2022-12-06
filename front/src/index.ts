import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";

const app = express();

// Configs
app.set('view engine', ejs);
app.set('views', path.join(__dirname, '../views'))

// Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/static', express.static(path.join(__dirname, '../static')))
app.use('/branding', express.static(path.join(__dirname, '../../branding')))

// Routes
import Main from "./routes/Main";
import Control from "./routes/Control";
import Feed from "./routes/Feed";

app.use("/", Main);
app.use("/control", Control);
app.use("/post", Feed);

// Host
const port = dotenv.config().parsed?.PORT || 80;

app.listen(port, () => {
    console.log(`[SERVER] Started on port ${port}`);
});