import { Request, Response } from "express";
import User from "./user.model";
import * as bcrypt from "bcrypt";

export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).send({
          success: false,
          message: "Users not found",
          data: null,
        });
      }

      res.status(200).send({
        success: true,
        data: users,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
          data: null,
        });
      }

      res.status(200).send({
        success: true,
        data: user,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { nombre, apellido, email, password } = req.body;
    try {
      const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            nombre,
            apellido,
            email,
          },
        },
        { new: true }
      );
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: "User not found",
          data: null,
        });
      }
      res.json({
        nombre: userUpdated.nombre,
        apellido: userUpdated.apellido,
        email: userUpdated.email,
        id: userUpdated._id,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);

      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
          data: null,
        });
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public changePass = async (req: Request, res: Response): Promise<any> => {
    const {
       passActual,
       nuevaPass,
       confirmaNuevaPass,
    } = req.body;
    try {
      if (!(nuevaPass === confirmaNuevaPass)) {
        return res.status(404).send({
          success: false,
          message: "Las nueva contraseña y su confirmación no coinciden",
        });
      }

      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
      const matchPasswords = await bcrypt.compare(passActual, user.password);
      if (!matchPasswords) {
        return res.status(400).send({
          success: false,
          message: "Contraseña incorrecta",
        });
      }

      const hash = await bcrypt.hash(nuevaPass, 10);
      user.password = hash;
      await user.save();

      res.json({message:"Contraseña actualizada"})
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };
}
