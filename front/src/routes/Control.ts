import express from "express";
import { API } from "../services/API";
import { marked } from "marked";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

import { Middleware } from "../services/Middlewares";

//const dompurify = createDomPurify(new JSDOM().window as any);
const router = express.Router();

router.get('/', Middleware.Regional({
    security: { loggedIn: true },
}), async (req, res) => {

    res.render('pages/Control.ejs', {
        //@ts-ignore
        user: await API.user(req.user?.id),
        users: await API.get('/user/list'),
    });

});


router.get('/user/:userId/delete', Middleware.Regional({
    security: { loggedIn: true, perms: ['administrator'] },
}), async (req, res) => {
    await API.delete('/user/delete/' + req.params.userId);
    res.redirect('/control' ?? req.query.redirect);
});

router.get('/user/:userId/articleWriter', Middleware.Regional({
    security: { loggedIn: true, perms: ['administrator'] },
}), async (req, res) => {
    await API.get('/user/articleWriter/' + req.params.userId);
    res.redirect('/control' ?? req.query.redirect);
});

router.get('/user/:userId/newsletterWriter', Middleware.Regional({
    security: { loggedIn: true, perms: ['administrator'] },
}), async (req, res) => {
    await API.get('/user/newsletterWriter/' + req.params.userId);
    res.redirect('/control' ?? req.query.redirect);
});

/*
router.post('/feed/new', Middlewares.secured({perms: ['feedWriter']}), async (req, res) => {
    const data = req.body;

    const send = {
        thumbnailURL: data.NEWPOST_THUMBNAIL,
        title: data.NEWPOST_TITLE,
        tags: data.NEWPOST_TAGS.split(', '),
        shortDescription: data.NEWPOST_SHORT_DESCRIPTION,
        description: data.NEWPOST_DESCRIPTION,
        author: 'Jürgen',
        authorID: '1',

        markdown: data.NEWPOST_MARKDOWN,
        htmlBody: dompurify.sanitize(marked(data.NEWPOST_MARKDOWN)),
        
        isPrivate: data.NEWPOST_PRIVATE == 'on' ? true : false,
        showThumbnailOnFeed: data.NEWPOST_SHOWTHUMBNAIL == 'on' ? true : false,
    };

    try {
        await API.post('/feed/new', send);
    } catch(err) {
        console.log(err);
    }
    
    res.redirect('/control');
});
*/

export default router;