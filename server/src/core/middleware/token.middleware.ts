import { Request, Response } from 'express';

import { checkToken } from '../../utils/auth';

export function tokenMiddleware(req: Request, res: Response, next: () => any) {
  console.log(`Request...`, req.headers.authorization);
  if (req.headers.authorization) {
    const [type, token] = req.headers.authorization.split(' ');
    if (type ==='Bearer') {
      req.isLogin = checkToken(token);
    }
  }
  next();
}
