import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
import { API } from "./services/API";

dotenv.config();
const app = express();

// Settings
app.set('view engine', ejs);
app.set('views', path.join(__dirname, '../views'))

// Middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/static', express.static(path.join(__dirname, '../static')))
app.use('/branding', express.static(path.join(__dirname, '../../branding')));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.user;
    next();
});

// Authentication
import session from "express-session";
import passport from "passport";
import Auth0Strategy from "passport-auth0";

// Session configuration
const sessionConfig = {
    secret: process.env.SESSION_SECRET as string,
    cookie: {},
    resave: false,
    saveUninitialized: false
};
    
if (app.get("env") === "production") {
    // Serve secure cookies, requires HTTPS
    sessionConfig.cookie = {secure: true};
}

// Passport configuration
const strategy = new Auth0Strategy({
    domain: 'dev-ju1e3m81p07xg8ze.us.auth0.com',
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

app.use("/", Main);
app.use("/control", Control);
app.use("/post", Feed);
app.use('/library', Library);

// Host
const port = dotenv.config().parsed?.PORT || 80;

app.listen(port, () => {
    console.log(`[SERVER] Started on port ${port}`);
});