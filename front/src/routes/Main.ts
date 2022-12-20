import express from "express";
import passport from "passport";
import querystring from "querystring";
import { API } from "../services/API";

const router = express.Router();

router.get('/', async (req, res) => {
    let feed: any[] = await API.get('/feed/list') ?? [];
    let articles: any[] = await API.get('/article/list') ?? [];

    res.render('pages/Home.ejs', {
        articles: articles?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        user: await API.user((req.user as any)?.id),
        feed: feed?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    });
});

router.get('/posts', async (req, res) => {
    let feed: any[] = await API.get('/feed/list') ?? [];
    
    res.render('pages/Feed.ejs', {
        user: await API.user((req.user as any)?.id),
        feed: feed?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    })
});

// Authentication
router.get("/login", passport.authenticate("auth0", {
      scope: "openid email profile"
}), (req, res) => {
      res.redirect("/");
    }
  );

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
            const returnTo = (req.session as any).returnTo;
            delete (req.session as any).returnTo;
            res.redirect(returnTo || "/");
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