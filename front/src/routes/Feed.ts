import express from "express";
import { API } from "../services/API";

const router = express.Router();

router.get('/:postId', async (req, res) => {
    let post = await API.get('/feed/view/' + req.params.postId) as any;
    let feed = await API.get('/feed/list') as any[];

    res.render('pages/ViewPost.ejs', {
        post: post,
        feed: shuffle(feed),
        user: await API.user((req.user as any)?.id),
    });
});

function shuffle(array: any[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

export default router;