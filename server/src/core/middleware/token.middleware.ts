import { Request, Response } from 'express';

import { checkToken } from '@/utils/auth';

export function tokenMiddleware(req: Request, res: Response, next: () => any) {
  const { cookies, headers } = req;
  let token = null;
  if (cookies && cookies.token) {
    token = cookies.token;
  } else if (headers.authorization) {
    const [type, tk] = headers.authorization.split(' ');
    if (type === 'Bearer') {
      token = tk;
    }
  }
  if (token) {
    const { decoded, error } = checkToken(token);
    if (error) {
      res.clearCookie('token');
    } else if (decoded) {
      req.user = decoded;
    }
  }
  next();
}
