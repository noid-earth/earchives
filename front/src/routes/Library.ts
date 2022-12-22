
import express from "express";
import { API } from "../services/API";
import { Middleware } from "../services/Middlewares";

const router = express.Router();

router.get('/:articleId', Middleware.Regional({
    
}), async (req, res) => {
    let article: any = await API.get(`/article/read/${req.params.articleId}`);
    if(!article) return res.redirect('/library');

    res.render('pages/Article.ejs', {
        //@ts-ignore
        user: req.session?.passport?.user,
        article: article,
    });
});

router.get('/readlater/:articleId/:userId', Middleware.Regional({
    security: { loggedIn: true }
}), async (req, res) => {
    await API.post('/user/readlater/' + req.params.articleId, {
        userId: req.params.userId,
        remove: req.query.remove == 'true',
    });
    res.redirect(`/library/${req.params.articleId}`)
});

router.get('/outdated/:articleId/:value', Middleware.Regional({
    security: { perms: ['articleWriter'] }
}), async (req, res) => {
    await API.post('/article/outdate/' + req.params.articleId, {
        value: req.params.value === 'true',
    });
    res.redirect(`/library/${req.params.articleId}`)
});

router.get('/delete/:articleId', Middleware.Regional({
    security: { perms: ['administrator'] }
}), async (req, res) => {
    await API.delete('/article/delete/' + req.params.articleId);
    res.redirect(`/library/${req.params.articleId}`)
});

export default router;