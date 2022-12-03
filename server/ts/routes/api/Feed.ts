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

    let post = await Feed.schema.create({
        id: `${uid()}`,
        data: {
            title: req.body.title,
            author: req.body.author,
            postedAt: new Date(),
            body: req.body.body,
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