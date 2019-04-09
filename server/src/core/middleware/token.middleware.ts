import { Request, Response } from 'express';

import { checkToken } from '@/utils/auth';

export function tokenMiddleware(req: Request, res: Response, next: () => any) {
  const { cookies, headers } = req;
  let token = null;
  if (cookies && cookies.token) {
    token = cookies.token;
  } else if (headers.authorization) {
    const [type] = headers.authorization.split(' ');
    if (type ==='Bearer') {
      token = checkToken(token);
    }
  }
  if (token) {
    const encoded = checkToken(token);
    if (encoded) {
      req.user = encoded;
    }
  }
  next();
}
