import { Request, Response } from "express";
import { API } from "./API";

type SECURED_PERMS = 'administrator' | 'feedWriter' | 'articleWriter' | 'emailVerified';

const middlewares = {
  secured: (options: {
    perms: SECURED_PERMS[]
  }) => {
    return async (req: Request, res: Response, next: any) => {
      let user = req.user as any;
      if (user) {
        user = await API.get('/user/get/' + user.id);

        let hasPerms: SECURED_PERMS[] = [];

        if(user.details.administrator) { hasPerms.push('administrator'); }  
        if(user.details.feedWriter) { hasPerms.push('feedWriter'); }  
        if(user.details.articleWriter) { hasPerms.push('articleWriter'); }
        if(user.details.emailVerified) { hasPerms.push('emailVerified'); }

        let missingPerms = options.perms.filter(x => !hasPerms.includes(x));

        if(missingPerms.length > 0) return res.redirect(`/noperms?perms=${missingPerms.join(',')}`)

        return next();
      }

      // @ts-ignore
      req.session.returnTo = req.originalUrl;
      return res.redirect("/login");
    }
  }
}

export default middlewares;
