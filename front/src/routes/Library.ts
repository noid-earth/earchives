import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";
import axios from "axios";

const router = express.Router();

router.get('/', async (req, res) => {
    let articles: any[] = await API.get('/article/list');

    let results: any[] = [];
    let searchRaw: string | undefined = req.query.q as string;
    let searchQuery: string | undefined = undefined;
    let searchYear: string | undefined = undefined;
    let searchSubject: string | undefined = undefined;

    let yearRegex = /ano\:(\d{1,2})/gm;
    let subjectRegex = /disciplina\:([a-zA-Z\u00C0-\u00FF_]+)/gm;

    if(req.query.q) {
        searchYear = searchRaw.match(yearRegex)?.[0]?.replace(/ano:/g, '');

        searchSubject = searchRaw.match(subjectRegex)?.[0]?.replace(/disciplina:/g, '')

        searchQuery = searchRaw.replace(yearRegex, '').replace(subjectRegex, '');

        results = await API.get(`/article/search?q=${searchQuery}`) as any[];

        results = results.filter((s) => {
            if(searchSubject && s.subjects.includes(searchSubject.replace(/_/g, ' '))) {
                return s;
            } else if(!searchSubject) {
                return s;
            }
        });

        results = results.filter((s) => {
            if(searchYear && s.years.includes(searchYear)) {
                return s;
            } else if(!searchYear) {
                return s;
            }
        });
    }

    res.render('pages/Library.ejs', {
        user: await API.user((req.user as any)?.id),
        articles: articles?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        searchRaw: searchRaw,
        searchQuery: searchQuery,
        searchYear: searchYear,
        searchSubject: searchSubject,
        results: results,
    });
});

router.get('/read/:articleId', async (req, res) => {
    let article: any = await API.get(`/article/read/${req.params.articleId}`);
    if(!article) return res.redirect('/library');

    res.render('pages/Article.ejs', {
        user: await API.user((req.user as any)?.id),
        article: article,
    });
});

router.post('/readlater/:articleId/:userId', async (req, res) => {
    await API.post('/user/readlater/' + req.params.articleId, {
        userId: req.params.userId,
        remove: req.query.remove == 'true',
    });
    res.redirect(`/library/read/${req.params.articleId}`)
});

router.post('/outdated/:articleId/:value', async (req, res) => {
    await API.post('/article/outdate/' + req.params.articleId, {
        value: req.params.value === 'true',
    });
    res.redirect(`/library/read/${req.params.articleId}`)
});

router.post('/delete/:articleId', async (req, res) => {
    await API.delete('/article/delete/' + req.params.articleId);
    res.redirect(`/library/read/${req.params.articleId}`)
});

export default router;