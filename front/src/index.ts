import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import morgan from "morgan";

import { API } from "./services/API";
import { Middleware } from "./services/Middlewares";

dotenv.config();
const app = express();

// Settings
app.set('trust proxy', 1);

app.set('view engine', ejs);
app.set('views', path.join(__dirname, '../views'))

// Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/static', express.static(path.join(__dirname, '../static')))
app.use('/branding', express.static(path.join(__dirname, '../../branding')));

app.use(morgan('common'))

// Authentication
import session from "express-session";
import passport from "passport";
import Auth0Strategy from "passport-auth0";

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET as string,
    cookie: { secure: false },
    resave: true,
    saveUninitialized: true,
    maxAge: 120000,
};
    
if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    sessionConfig.cookie = {secure: true};
}

// Passport configuration
const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN as string,
    clientID: process.env.AUTH0_CLIENT_ID as string,
    clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
    callbackURL: process.env.AUTH0_CALLBACK_URL as string,
}, async function(accessToken, refreshToken, extraParams, profile, done) {
    const user = await API.post(`/user/ensure/` + profile.id, {
        provider: profile.provider ?? 'auth0',
        providerId: profile.id,
        email: profile.emails?.[0].value,
    });
    
    return done(null, user);
}
);

app.use(session(sessionConfig));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user: any, done) => {
    done(null, user);
});

// Routes
import Main from "./routes/Main";
import Control from "./routes/Control";
import Feed from "./routes/Feed";
import Library from "./routes/Library";


app.get('/error', (req, res) => {
    res.send(req.query.message);
    setTimeout(() => res.redirect('/'), 10000);
});

app.use(Middleware.Global())

app.use("/", Main);
app.use("/control", Control);
app.use("/newsletter", Feed);
app.use('/library', Library);

// Host
const port = dotenv.config().parsed?.PORT || 80;

app.listen(port, () => {
    console.log(`[SERVER] Started on port ${port}`);
});