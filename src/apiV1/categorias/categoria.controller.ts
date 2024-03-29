import { Request, Response } from 'express';
import Categoria from './categoria.model';

export default class CategoriaController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const categorias = await Categoria.find().populate({
        path: 'descendientes',
        populate: { path: 'descendientes' }
      });
      if (!categorias) {
        return res.status(404).send({
          success: false,
          message: 'Categorias no encontradas',
          data: null,
        });
      }
      res.json(categorias);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public findAllPublic = async (req: Request, res: Response): Promise<any> => {
    try {
      const categorias = await Categoria.find().populate({
        path: 'descendientes',
        populate: { path: 'descendientes' }
      });
      if (!categorias) {
        return res.status(404).send({
          success: false,
          message: 'Categorias no encontradas',
          data: null,
        });
      }
      res.json(categorias);
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
      const categoria = await Categoria.findById(req.params.id);
      if (!categoria) {
        return res.status(404).send({
          success: false,
          message: 'Categoria no encontrada',
          data: null,
        });
      }
      res.json(categoria);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public create = async (req: Request, res: Response): Promise<any> => {
    const nuevaCategoria = {
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      padre: req.body.padre || null,
    };
    try {
      const categoria = new Categoria(nuevaCategoria);
      const newCategoria = await categoria.save();
      // Si la categoría insertada tiene padre, agregarla como descendencia del padre
      if (newCategoria.padre) {
        const padre = await Categoria.findById(newCategoria.padre._id);
        if (padre.descendientes) {
          padre.descendientes.push(newCategoria._id);
        } else {
          padre.descendientes = [newCategoria._id];
        }
        await padre.save();
      }
      res.json(newCategoria);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { nombre, descendientes, tipo } = req.body;
    try {
      const categoriaUpdated = await Categoria.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            nombre,
            tipo,
            descendientes,
          },
        },
        { new: true }
      );
      if (!categoriaUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Categoria no encontrada',
          data: null,
        });
      }
      res.json(categoriaUpdated);
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
      const categoria = await Categoria.findByIdAndRemove(req.params.id);

      if (!categoria) {
        return res.status(404).send({
          success: false,
          message: 'Categoria no encontrada',
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
}
