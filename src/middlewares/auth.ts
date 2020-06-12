import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isValidHostname = (req: Request, res: Response, next: NextFunction): void => {
  const validHosts = ['dina.ec', 'localhost'];
  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.headers;
    if (token) {
      const data: any = jwt.verify(token as string, process.env.JWT_SECRET!);
      req.sessionData = { userId: data.userId, role: data.role };
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token',
      };
    }
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { role } = req.sessionData;
    if (role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Invalid role',
      };
    }
    next();
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: error.status || 'ERROR', message: error.message });
  }
};
