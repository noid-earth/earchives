import express from 'express';
import { Middleware } from '../services/Middlewares';
import { API } from '../services/API';
const router = express.Router();

router.get('/', Middleware.Regional({
    security: { loggedIn: true }
}), async (req, res) => {

     //@ts-ignore
    let user = await API.user(req.user?.id);

    req.user = user;

    res.render('pages/User.ejs', {
        user: user,
        library: await API.get('/article/list', true),
    });

});

export default router;