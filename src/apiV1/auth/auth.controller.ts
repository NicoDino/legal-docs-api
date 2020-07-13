import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import User from '../users/user.model';
import { JWT_SECRET } from '../../../config.private';

export default class UserController {
  public authenticate = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'No Autorizado',
      });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'Usuario inexistente',
        });
      }
      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: 'No autorizado',
        });
      }

      const token = await jwt.sign({ email }, JWT_SECRET, {
        expiresIn: 10000,
      });

      res.json({
        user: { nombre: user.nombre, apellido: user.apellido, email: user.email, id: user._id },
        token,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };

  public register = async (req: Request, res: Response): Promise<any> => {
    const { nombre, apellido, email, password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);

      const user = new User({
        nombre,
        apellido,
        email,
        password: hash,
      });

      const newUser = await user.save();

      res.status(201).send({
        success: false,
        message: 'User Successfully created',
        data: newUser,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };
}
