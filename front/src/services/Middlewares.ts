import { NextFunction, Request, Response } from "express";
import { API, API_STATUS, Cache } from "./API";

const APIStatus = new API_STATUS();

export type SECURED_PERMS = 'administrator' | 'feedWriter' | 'articleWriter' | 'emailVerified';

export class Middleware {
  static Global() {
    return async function (req: Request, res: Response, next: NextFunction) {
      console.log('Passing global')
      
      if(!['/login', '/callback', '/logout'].includes(req.path)) {
        Cache.set(req.ip, {lastSeen: {path: req.path, date: new Date()}})
      }

      req.session.save();

      if(!APIStatus.Status) {
        return res.redirect('/error?message=API não está disponível!')
      }

      return next();
    }
  }

  static Regional(options: {
    security?: {
      loggedIn?: boolean,
      perms?: SECURED_PERMS[],
    }
  }) {
    return async function (req: Request, res: Response, next: NextFunction) {
      console.log('Passing regional')

      let user = req.user as any;

      if(options.security?.loggedIn && !user) {
         // @ts-ignore
         req.session.returnTo = req.originalUrl;
         return res.redirect("/login");
      };

      if(options.security?.perms) {

        if(user) {
          user = await API.get('/user/get/' + user.id);

          let hasPerms: SECURED_PERMS[] = [];

          if(user.details.administrator) { hasPerms.push('administrator'); }  
          if(user.details.feedWriter) { hasPerms.push('feedWriter'); }  
          if(user.details.articleWriter) { hasPerms.push('articleWriter'); }
          if(user.details.emailVerified) { hasPerms.push('emailVerified'); }

          let missingPerms = options.security.perms.filter(x => !hasPerms.includes(x));

          if(missingPerms.length > 0) return res.redirect(`/error?message=Faltam as permissões (${missingPerms.join(',')}) para aceder à esta página.`)

          return next();
        } else {
          // @ts-ignore
          req.session.returnTo = req.originalUrl;
          return res.redirect("/login");
        }
      }

      return next();
    }

  }

}
