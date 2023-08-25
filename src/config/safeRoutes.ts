import { NextFunction, Request, Response } from 'express';
import { getEntityManager} from '@typedorm/core';

import ActiveSession from '../models/activeSession';

// eslint-disable-next-line import/prefer-default-export
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = String(req.headers.authorization || req.body.token);
  const entityManager = getEntityManager();
  entityManager.find(ActiveSession,{ token : token }).then((session) => {
    console.log(token);
    if (session.items.length === 1) {
      return next();
    }
    return res.json({ success: false, msg: 'User is not logged on' });
  });
};
