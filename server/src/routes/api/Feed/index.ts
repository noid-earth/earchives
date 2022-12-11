import express from "express";
import { Database } from "../../../database";
import { access } from "../../utils/access";
import { Users } from "../User";

const router = express.Router();
const Feed = new Database({ collection: 'posts', database: 'Feed' });

/**
 * GET /api/feed/list
 */
 router.get('/list', async (req, res) => {
    const data = await Feed.schema.find({ });
    return res.send(data.map((a: any) => a.data));
});

/**
 * POST - /api/feed/new
 */
router.post('/new', access, async (req, res) => {

    const uid = () => `${Date.now().toString().slice(8, 14)}`;

    let id = `${uid()}`;

    let post = await Feed.schema.create({
        id: id,
        data: {
            id: id,

            thumbnailURL: req.body.thumbnailURL,
            tags: req.body.tags,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            author: req.body.author,
            authorID: req.body.authorID,
            createdAt: new Date(),

            description: req.body.description,
            markdown: req.body.markdown,
            htmlBody: req.body.htmlBody,

            isPrivate: req.body.isPrivate || false,
            showThumbnailOnFeed: req.body.showThumbnailOnFeed || false,
        }
    });

    return res.send(post);
});

/**
 * DELETE - /api/feed/delete/:postId
 */
router.delete('/delete/:postId', access, async (req, res) => {

    if (!req.params.postId) return res.status(300);

    await Feed.schema.deleteOne({
        id: req.params.postId
    });

    return res.status(200);
});

/** 
 * GET /api/feed/view/:id
*/
router.get('/view/:id', async (req, res) => {
    let postId = req.params.id;
    let post = await Feed.schema.findOne({ 'id': postId });
    let data = post.data;
    data.author = (await Users.schema.findOne({ 'data.id': data.authorId })).data;
    return res.send(data ? data : undefined);
});

export default router;