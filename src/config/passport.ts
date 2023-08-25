import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { getEntityManager} from '@typedorm/core';

import User from '../models/user';


export default (pass: passport.PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.SECRET,
  };

  pass.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const entityManager = getEntityManager();
        
        const user = await entityManager?.findOne(User,{id: jwtPayload._doc._id});

        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    }),
  );
};
