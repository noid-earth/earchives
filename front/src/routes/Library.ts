import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";

const router = express.Router();

router.get('/', async (req, res) => {
    let articles = await API.get('/article/list') as any[];
    let search = await API.get(`/article/search?q=${req.query.q}`);

    res.render('pages/Library.ejs', {
        user: req.user,
        articles: articles,
        searchQuery: req.query.q,
        search: search,
    });
});

export default router;