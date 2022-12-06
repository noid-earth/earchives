import express from "express";
import { API } from "../services/API";

const router = express.Router();

router.get('/', async (req, res) => {
    let feed: any[] = await API.get('/feed/list') as any;

    res.render('pages/Home.ejs', {
        feed: feed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
});

export default router;