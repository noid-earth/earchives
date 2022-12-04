import express from "express";
import { Database } from "../../database";

const router = express.Router();
const Feed = new Database({ collection: 'posts', database: 'Feed' });

// Get posts
router.get('/', async (req, res) => {
    const data = await Feed.schema.find({ });
    return res.send(data);
});

// Add posts
router.post('/', async (req, res) => {

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

// Delete posts
router.delete('/:id', async (req, res) => {

    if (!req.params.id) return res.status(300);

    await Feed.schema.deleteOne({
        id: req.params.id
    });

    return res.status(200);
});

export default router;