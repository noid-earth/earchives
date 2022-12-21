import express from "express";
import { Database } from "../../../database";
import { newId } from "../../utils/id";
import { access } from "../../utils/access";
import { Article, ArticleHistory, ArticleHistoryType } from "./interfaces";
import { Util } from "../../utils/data";
import { Users } from "../User";

import { marked } from "marked";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";
const dompurify = createDomPurify(new JSDOM().window as any);

const router = express.Router();
const Articles = new Database({ collection: 'articles', database: 'Library' });

/**
 * GET /api/article/new
 */
router.post('/new', access, async (req, res) => {
    let id = newId();
    let raw = req.body;

    let author = await Users.schema.findOne({ 'id': raw.authorId });

    let body = {
        toHtml: dompurify.sanitize(marked(raw.body.markdown))
    }

    let showAfter = raw.details?.showAfter ?? null;

    if(showAfter) {
        if(['object', 'string'].includes(typeof showAfter)) {
            showAfter = new Date(showAfter);
        }
    }

    let article: Article = {
        id: id,
        title: raw.title,
        createdAt: new Date(),
        author: author.data || null,
        authorId: raw.authorId,
        body: {
            markdown: raw.body.markdown,
            html: raw.body.html?.length > 0 ? raw.body.html : body.toHtml,
        },
        history: [],
        subjects: [...raw.subjects],
        years: [...raw.years],
        attachments: [...raw.attachments],
        details: {
            showAfter: showAfter,
            private: raw.details.private,
            outdated: raw.details.outdated,
        }
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
    let r: any = await Articles.schema.findOneAndRemove({ 'id': req.params.id });
    if(r) {
        return res.send(r.data).status(200);
    } else {
        return res.send('Post not found!').status(300);
    }
});

/**
 * POST /api/article/upvote/:articleId
 */
router.post('/upvote/:id', access, async (req, res) => {
    let update = await newHistoryObj({
        articledId: req.params.id,
        refId: req.body.refId,
        type: 'UPVOTE',
    });

    return res.send(update).status(200);
});

/**
 * POST /api/article/downvote/:articleId
 */
router.post('/downvote/:id', access, async (req, res) => {
    let update = await newHistoryObj({
        articledId: req.params.id,
        refId: req.body.refId,
        type: 'DOWNVOTE',
    });

    return res.send(update).status(200);
});

/**
 * POST /api/article/favorite/:articleId
 */
router.post('/favorite/:id/', access, async (req, res) => {

    let update = await newHistoryObj({
        articledId: req.params.id,
        refId: req.body.refId,
        type: 'FAVORITE',
    });

    return res.send(update).status(200);
});

/**
 * POST /api/article/favorite/:articleId
 */
router.post('/outdate/:id', access, async (req, res) => {
    let { data } = await Util.set(Articles, `${req.params.id}.details.outdated`, req.body.value)

    return res.send(data).status(200);
});

/**
 * GET /api/article/read/:articleId
 */
router.get('/read/:id', async (req, res) => {
    let articleId = req.params.id;
    let article = await Articles.schema.findOne({ 'id': articleId });
    let data = article?.data;
    if(!data) return res.send(undefined);
    data.author = (await Users.schema.findOne({ 'data.id': data.authorId }))?.data;
    return res.send(data ? data : undefined);
});

async function newHistoryObj(data: {
    articledId: string,
    refId: string,
    type: ArticleHistoryType,
}) {
    let old = await Articles.schema.findOne({ 'id': data.articledId });

    if(!old) return null;
    let array: ArticleHistory[] = [...old.data.history];

    if(array.find((article) => article.refId == data.refId && article.type == data.type)) {
        return null;
    }

    array.push({
        date: new Date(),
        articleId: data.articledId as string,
        refId: data.refId as string,
        type: data.type,
    });

    let req = await Util.set(Articles, `${data.articledId}.history`, array);
    return req.data;
}

export default router;