import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";
import axios from "axios";

const router = express.Router();

router.get('/:articleId', async (req, res) => {
    let article: any = await API.get(`/article/read/${req.params.articleId}`);
    if(!article) return res.redirect('/library');

    res.render('pages/Article.ejs', {
        user: await API.user((req.user as any)?.id),
        article: article,
    });
});

router.post('/readlater/:articleId/:userId', async (req, res) => {
    await API.post('/user/readlater/' + req.params.articleId, {
        userId: req.params.userId,
        remove: req.query.remove == 'true',
    });
    res.redirect(`/library/read/${req.params.articleId}`)
});

router.post('/outdated/:articleId/:value', async (req, res) => {
    await API.post('/article/outdate/' + req.params.articleId, {
        value: req.params.value === 'true',
    });
    res.redirect(`/library/read/${req.params.articleId}`)
});

router.post('/delete/:articleId', async (req, res) => {
    await API.delete('/article/delete/' + req.params.articleId);
    res.redirect(`/library/read/${req.params.articleId}`)
});

export default router;