
import express from "express";
import { API } from "../services/API";
import { Middleware } from "../services/Middlewares";

const router = express.Router();

router.get('/:articleId', Middleware.Regional({
    apiRequired: true,
}), async (req, res) => {
    let article: any = await API.get(`/article/read/${req.params.articleId}`);
    if(!article) return res.redirect('/library');

    res.render('pages/Article.ejs', {
        //@ts-ignore
        user: await API.user(req.user?.id),
        article: article,
    });
});

router.get('/readlater/:articleId/:userId', Middleware.Regional({
    security: { loggedIn: true },
    apiRequired: true,
}), async (req, res) => {

    await API.post('/user/readlater/' + req.params.articleId, {
        userId: req.params.userId,
        remove: req.query.remove == 'true',
    });
    res.redirect(`/library/${req.params.articleId}`)
});

router.get('/upvote/:articleId', Middleware.Regional({
    apiRequired: true,
}), async (req, res) => {
    await API.post('/article/upvote/' + req.params.articleId, {
        refId: (req.user as any).id,
    });

    res.redirect(`/library/${req.params.articleId}`);
});

router.get('/downvote/:articleId', Middleware.Regional({
    apiRequired: true,
}), async (req, res) => {
    await API.post('/article/downvote/' + req.params.articleId, {
        refId: (req.user as any).id,
    });

    res.redirect(`/library/${req.params.articleId}`);
});

router.get('/favorite/:articleId', Middleware.Regional({
    apiRequired: true,
    security: { loggedIn: true }
}), async (req, res) => {
    await API.post('/article/favorite/' + req.params.articleId, {
        refId: (req.user as any).id,
    });

    await API.post('/user/favorite', {
        //@ts-ignore
        userId: req.user?.id,
        refId: req.params.articleId
    });

    res.redirect(`/library/${req.params.articleId}`);
});

router.get('/outdated/:articleId/:value', Middleware.Regional({
    security: { perms: ['articleWriter'] },
    apiRequired: true,
}), async (req, res) => {
    await API.post('/article/outdate/' + req.params.articleId, {
        value: req.params.value === 'true',
    });
    res.redirect(`/library/${req.params.articleId}`)
});

router.get('/private/:articleId/:value', Middleware.Regional({
    security: { perms: ['articleWriter'] },
    apiRequired: true,
}), async (req, res) => {
    await API.post('/article/private/' + req.params.articleId, {
        value: req.params.value === 'true',
    });
    res.redirect(`/library/${req.params.articleId}`)
});

router.get('/delete/:articleId', Middleware.Regional({
    security: { perms: ['administrator'] },
    apiRequired: true,
}), async (req, res) => {
    await API.delete('/article/delete/' + req.params.articleId);
    res.redirect(`/library/${req.params.articleId}`)
});

export default router;