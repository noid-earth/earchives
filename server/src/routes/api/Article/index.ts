import express from "express";
import { Database } from "../../../database";
import { newId } from "../../../database/utils/id";
import { access } from "../../utils/access";
import { Article } from "./interfaces";
import { Util } from "../../utils/data";

const router = express.Router();
const Articles = new Database({ collection: 'articles', database: 'Library' });

/**
 * GET /api/article/new
 */
router.post('/new', access, async (req, res) => {
    let id = newId();

    let article: Article = {
        id: id,
        title: req.body.title,
        createdAt: new Date(),
        author: null,
        authorId: req.body.authorId,
        subjects: req.body.subjects,
        body: req.body.body,
        bannerURL: req.body.bannerURL,
        private: req.body.private,
        year: req.body.year,
        history: [],
    }

    await Articles.schema.create({
        id: id,
        data: article
    });

    return res.send(article).status(200);
});

/**
 * GET /api/article/list
 */
router.get('/list', async (req, res) => {
    const data = await Articles.schema.find({ });
    return res.send(data.map((a: any) => a.data));
});

/**
 * GET /api/article/search
 */
router.get('/search', async (req, res) => {
    if(!req.query.q) {
        const data = await Articles.schema.find({ });
        return res.send(data.map((a: any) => a.data));
    }
    
    let results = await Articles.schema.find({ $text: { $search: req.query.q as string }});
    return res.send(results.map((a: any) => a.data));
});

/**
 * DELETE /api/article/delete/:id
 */
router.delete('/delete/:id', access, async (req, res) => {
    let r = await Articles.schema.findOneAndRemove({ 'id': req.params.id });
    if(r) {
        return res.send(r.data).status(200);
    } else {
        return res.send('Post not found!').status(300);
    }
});

/**
 * POST /api/article/upvote/:articleId/:userId
 */
router.post('/upvote/:id/:userId', access, async (req, res) => {
    let old = await Articles.schema.findOne({ 'id': req.params.id });
    if(!old) return res.send('Post not found!').status(300);

    let array = [...old.data.history];

    if(array.find((h) => h.userId === req.params.userId)) return res.send(old);

    array.push({
        date: new Date(),
        id: newId,
        articleId: req.params.id,
        type: 'Upvote',
        userId: req.params.userId ?? undefined,
    });

    let n = await Util.set(Articles,  `${req.params.id}.history`, array);

    return res.send(n.data).status(200);
});

/**
 * POST /api/article/downvote/:articleId/:userId
 */
router.post('/downvote/:id/:userId', access, async (req, res) => {
    let old = await Articles.schema.findOne({ 'id': req.params.id });
    if(!old) return res.send('Post not found!').status(300);

    let array = [...old.data.history];

    if(array.find((h) => h.userId === req.params.userId)) return res.send(old);

    array.push({
        date: new Date(),
        id: newId,
        articleId: req.params.id,
        type: 'Downvote',
        userId: req.params.userId ?? undefined,
    });

    let n = await Util.set(Articles,  `${req.params.id}.history`, array);

    return res.send(n.data).status(200);
});

/**
 * POST /api/article/favorite/:articleId/:userId
 */
router.post('/favorite/:id/:userId', access, async (req, res) => {
    let old = await Articles.schema.findOne({ 'id': req.params.id });
    if(!old) return res.send('Post not found!').status(300);

    let array = [...old.data.history];

    if(array.find((h) => h.userId === req.params.userId)) return res.send(old);

    array.push({
        date: new Date(),
        id: newId,
        articleId: req.params.id,
        type: 'Favorite',
        userId: req.params.userId ?? undefined,
    });

    let n = await Util.set(Articles,  `${req.params.id}.history`, array);

    return res.send(n.data).status(200);
});

/**
 * GET /api/article/view/:articleId
 */
router.get('/view/:id', async (req, res) => {
    let articleId = req.params.id;
    let post = await Articles.schema.findOne({ 'id': articleId });
    return res.send(post.data ? post.data : undefined);
});

export default router;