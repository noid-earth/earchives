import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";

const router = express.Router();

router.get('/', async (req, res) => {
    res.render('pages/Library.ejs', {
        user: req.user,
    });
});

export default router;