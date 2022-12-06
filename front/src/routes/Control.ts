import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";
import { marked } from "marked";
import createDomPurify from "dompurify";
import { JSDOM } from "jsdom";

const dompurify = createDomPurify(new JSDOM().window as any);
const router = express.Router();

router.get('/', async (req, res) => {
    let feed: any[] = await API.get('/feed/list') as any;

    res.render('pages/Control.ejs', {
        feed: feed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
});

router.post('/feed/new', async (req, res) => {
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

export default router;