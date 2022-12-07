import { Request, Response } from "express";

const middlewares = {
  secured: (req: Request, res: Response, next: any) => {
    if (req.user) {
      return next();
    }
    // @ts-ignore
    req.session.returnTo = req.originalUrl;
    return res.redirect("/login");
  }
}

export default middlewares;
