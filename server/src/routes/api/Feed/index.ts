import express from "express";
import { Database } from "../../../database";
import { access } from "../../utils/access";

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
            categories: req.body.categories,
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            author: req.body.author,
            authorID: req.body.authorID,
            createdAt: new Date(),

            description: req.body.description,
            body: req.body.body,

            isPrivate: req.body.isPrivate || false,
            showThumbnailOnFeed: req.body.showThumbnailOnFeed || false,
        }
    });

    return res.send(post);
});

/**
 * DELETE - /api/feed/delete/:id
 */
router.delete('/delete/:id', access, async (req, res) => {

    if (!req.params.id) return res.status(300);

    await Feed.schema.deleteOne({
        id: req.params.id
    });

    return res.status(200);
});

/** 
 * GET /api/feed/view/:id
*/
router.get('/view/:id', async (req, res) => {
    let postId = req.params.id;
    let post = await Feed.schema.findOne({ 'id': postId });
    return res.send(post.data ? post.data : undefined);
});

export default router;