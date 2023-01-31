// @ts-ignore
import express from "express";
import axios from "axios";
import cors from "cors";
import { Octokit } from "@octokit/core";

const app = express();
app.use(cors());

const octokit = new Octokit({ auth: process.env.GITHUB_KEY });

let articles: {
    name: string,
    path: string,
    sha: string,
    size: number,
    url: string,
    download_url: string,
    year?: string,
    subject?: string,
    type: string,
    fontsAndDocuments: string[],
    markdownContent: string,
}[] = [];

app.get("/articles", (req, res) => {
    res.json(articles);
});

const PORT = 3101;
app.listen(PORT, () => {
    console.log('Server is up! On port: ' + PORT);
    fetchAll();;
    setInterval(() => {
        fetchAll();
    }, 6 * 60 * 1000);
});

async function fetchAll() {
    console.log('Fetched all data!');
    await FetchArticles();
}

async function FetchArticles(): Promise<void> {
    const githubApi = await octokit.request('GET /repos/noid-earth/earchives/contents/articles');

    if(!githubApi) return await FetchArticles();

    articles = [];

    for(const rawArticle of githubApi.data) {
        const articleMarkdown = (await axios.get(rawArticle.download_url)).data as string;

        if(!articleMarkdown) return;
        if(!articleMarkdown.includes('---CONTENT---')) return;

        const splitArticleMarkdown = articleMarkdown.split('---CONTENT---');

        const YEAR_REG = /YEAR\:.(\d{1,2})/gm;
        const SUBJECT_REG = /SUBJECT\:.([a-zA-Z\u00C0-\u00FF_]+)/gm;
        const LINKS_REG = /(LINKS:([^"]|")*\.)/g;

        const LINKS = splitArticleMarkdown[0].match(LINKS_REG)?.[0].replace(/LINKS:/g, '').replace(/\./g, '').split(',').map((l) => l.trim());

        articles.push({
            name: rawArticle.name.replace(/.md/g, ''),
            path: rawArticle.path,
            sha: rawArticle.sha,
            size: rawArticle.size,
            url: rawArticle.url,
            download_url: rawArticle.download_url,
            type: rawArticle.type,
            year: splitArticleMarkdown[0].match(YEAR_REG)?.[0].replace(/YEAR:/g, '').trim(),
            fontsAndDocuments: LINKS ?? [],
            subject: splitArticleMarkdown[0].match(SUBJECT_REG)?.[0].replace(/SUBJECT:/g, '').trim(),
            markdownContent: splitArticleMarkdown[1],
        });

    }
}