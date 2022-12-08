import bodyParser from "body-parser";
import express from "express";
import { API } from "../services/API";

const router = express.Router();

router.get('/', async (req, res) => {
    let articles = await API.get('/article/list') as any[];
    let search: any[] = [];
    let searchedYear: string | undefined = undefined;
    let searchedSubject: string | undefined = undefined;
    
    if(req.query.q) {
        let query = req.query.q as string;
        let cleanQuery = query.toLowerCase().replace(/ê/g, 'e').replace(/ó/g, 'o').replace(/ano\:(\d{1,2})/g, '').replace(/disciplina\:(\w+)/g, '')

        search = await API.get(`/article/search?q=${cleanQuery}`) as any[];

        let yearQuery = query.match(/ano\:(\d{1,2})/gm);
        searchedYear = yearQuery?.[0].replace(/ano:/g, '');

        search = search.filter((s) => {
            let resultYears = s.year.map((y: number | string) => String(y));

            if(searchedYear && resultYears.includes(searchedYear)) {
                return s;
            } else if(!searchedYear) {
                return s;
            }
        });

        let subjectQuery = query.trim().toLowerCase().replace(/ê/g, 'e').replace(/ó/g, 'o').match(/disciplina\:(\w+)/gm);
        searchedSubject = subjectQuery?.[0].replace(/disciplina:/g, '');

        search = search.filter((s) => {
            let resultSubjects = s.subjects.map((y: string) => y.trim().trim().toLowerCase().replace(/ê/g, 'e').replace(/ó/g, 'o'));
            
            if(searchedSubject && resultSubjects.includes(searchedSubject)) {
                return s;
            } else if(!searchedSubject) {
                return s;
            }
        });
    }

    res.render('pages/Library.ejs', {
        user: req.user,
        articles: articles,
        searchQuery: req.query.q,
        search: search,
        searchedYear: searchedYear,
        searchedSubject: searchedSubject,
    });
});

export default router;