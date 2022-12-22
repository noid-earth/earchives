import express from "express";
import passport from "passport";
import querystring from "querystring";
import { API, Cache } from "../services/API";

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

    res.render('pages/Home.ejs', {
        //@ts-ignore
        user: req.session?.passport?.user,
        articles: articles?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        searchRaw: searchRaw,
        searchQuery: searchQuery,
        searchYear: searchYear,
        searchSubject: searchSubject,
        results: results,
    });
});

// Authentication
router.get("/login", passport.authenticate("auth0", {
    scope: "openid email profile",
}), (req, res) => {
    res.redirect('/');
});

router.get("/callback", (req, res, next) => {
    passport.authenticate("auth0", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect("/login");
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const returnTo = Cache.get(req.ip)?.lastSeen?.path;
            return res.redirect(returnTo || "/");
        });
    })(req, res, next);
});

router.get("/logout", (req, res) => {
    
    req.logOut({ keepSessionInfo: false}, () => {});
  
    let returnTo = req.protocol + "://" + req.hostname;
    let port = Number(process.env.PORT);

    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo = `http://localhost:80`;
    }
  
    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
  
    const searchString = querystring.stringify({ client_id: process.env.AUTH0_CLIENT_ID, returnTo: returnTo });
    logoutURL.search = searchString;
  
    return res.redirect(logoutURL.toString());
  });

export default router;