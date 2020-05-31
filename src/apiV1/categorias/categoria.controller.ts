import { Request, Response } from 'express';
import Categoria from './categoria.model';

export default class CategoriaController {

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            // const categorias = await Categoria.find().populate('descendientes').exec();
            const categorias = await Categoria.find();
            if (!categorias) {
                return res.status(404).send({
                    success: false,
                    message: 'Categorias not found',
                    data: null
                });
            }
            console.log(categorias)
            res.json(categorias);
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };


    public findOne = async (req: Request, res: Response): Promise<any> => {
        try {
            const categoria = await Categoria.findById(req.params.id, { password: 0 });
            if (!categoria) {
                return res.status(404).send({
                    success: false,
                    message: 'Categoria not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: categoria
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public create = async (req: Request, res: Response): Promise<any> => {
        const { nombre, padre } = req.body;
        try {
            const categoria = new Categoria({
                nombre,
                padre
            });
            const newCategoria = await categoria.save();
            res.json(newCategoria);
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        const { nombre,  descendientes } = req.body;
        try {
            const categoriaUpdated = await Categoria.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        nombre,
                         descendientes
                    }
                },
                { new: true }
            );
            if (!categoriaUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'Categoria not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: categoriaUpdated
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
            const categoria = await Categoria.findByIdAndRemove(req.params.id);

            if (!categoria) {
                return res.status(404).send({
                    success: false,
                    message: 'Categoria not found',
                    data: null
                });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };
}
