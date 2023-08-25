import bcrypt from 'bcrypt';
import { getEntityManager} from '@typedorm/core';
import express from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

//import { checkToken } from '../config/safeRoutes';
import ActiveSession from '../models/activeSession';
import User, { USER_ROLE } from '../models/user';
//import { connection } from '../server/database';

// eslint-disable-next-line new-cap
const router = express.Router();
// Route: <HOST>:PORT/api/users/

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(4).max(15)
    .optional(),
  password: Joi.string().required(),
});

router.post('/register', async (req, res) => {
  // Joy Validation
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }
  const { username, email, password } = req.body;
  getEntityManager().findOne(User,{ email:email }).then((user) => {
    if (user) {
      res.json({ success: false, msg: 'Email already exists' });
    } else {
      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(password, salt).then((hash) => {

          let usr = new User();
          usr.username = username;
          usr.password = hash;
          usr.email = email;
          usr.role  = USER_ROLE.SUADMIN;

          getEntityManager().create<User>(usr).then((u) => {
            res.json({ success: true, userID: u.id, msg: 'The user was successfully registered' });
          });
        });
      });
    }
  });
});


router.post('/login', (req, res) => {
  // Joy Validation
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(422).json({
      success: false,
      msg: `Validation err: ${result.error.details[0].message}`,
    });
    return;
  }

  const { email } = req.body;
  const { password } = req.body;

  getEntityManager().findOne(User,{ email }).then((user) => {
    if (!user) {
      return res.json({ success: false, msg: 'Wrong credentials' });
    }

    if (!user.password) {
      return res.json({ success: false, msg: 'No password' });
    }

    bcrypt.compare(password, user.password, (_err2, isMatch) => {
      if (isMatch) {
        if (!process.env.SECRET) {
          throw new Error('SECRET not provided');
        }

        const token = jwt.sign({
          id: user.id,
          username: user.username,
          email: user.email,
        }, process.env.SECRET, {
          expiresIn: 86400, // 1 week
        });

        let as = new ActiveSession();
        as.userId = user.id;
        as.token = token

        getEntityManager().create(as);
        // Delete the password (hash)
        (user as { password: string | undefined }).password = undefined;
        return res.json({
          success: true,
          token,
          user,
        });
      }
      return res.json({ success: false, msg: 'Wrong credentials' });
    });
  });
});


router.get('/testme', (_req, res) => {
  res.status(200).json({ success: true, msg: 'all good' });
});

export default router;
