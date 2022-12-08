import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";

const router = express.Router();

router.get('/', async (req, res) => {
    let articles = await API.get('/article/list') as any[];
    let search: any[] = [];
    
    if(req.query.q) {
        let query = req.query.q as string;
        let cleanQuery = query.toLowerCase().replace(/ê/g, 'e').replace(/ó/g, 'o').replace(/ano\:(\d{1,2})/g, '').replace(/disciplina\:(\w+)/g, '')

        search = await API.get(`/article/search?q=${cleanQuery}`) as any[];

        let anoQuery = query.match(/ano\:(\d{1,2})/gm);
        let ano = anoQuery?.[0].replace(/ano:/g, '');

        search = search.filter((s) => {
            let resultYears = s.year.map((y: number | string) => String(y));

            if(ano && resultYears.includes(ano)) {
                return s;
            } else if(!ano) {
                return s;
            }
        });

        let subjectQuery = query.trim().toLowerCase().replace(/ê/g, 'e').replace(/ó/g, 'o').match(/disciplina\:(\w+)/gm);
        let subject = subjectQuery?.[0].replace(/disciplina:/g, '');

        search = search.filter((s) => {
            let resultSubjects = s.subjects.map((y: string) => y.trim().trim().toLowerCase().replace(/ê/g, 'e').replace(/ó/g, 'o'));
            
            if(subject && resultSubjects.includes(subject)) {
                return s;
            } else if(!subject) {
                return s;
            }
        });
    }

    res.render('pages/Library.ejs', {
        user: req.user,
        articles: articles,
        searchQuery: req.query.q,
        search: search,
    });
});

export default router;