import { Request, Response } from 'express';
import Campo from './campo.model';
import campo from './campo.route';

export default class CampoController {

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const campos = await Campo.find();
            if (!campos) {
                return res.status(404).send({
                    success: false,
                    message: 'Campos not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: campos
            });
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
            const campo = await Campo.findById(req.params.id, { password: 0 });
            if (!campo) {
                return res.status(404).send({
                    success: false,
                    message: 'Campo not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: campo
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
        const { identificador, nombre, descripcion, tipo, opciones, min, max } = req.body;
        try {
            const campo = new Campo({
                identificador,
                nombre,
                descripcion,
                tipo,
                opciones,
                min,
                max
            });
            const newCampo = await campo.save();
            res.status(201).send({
                success: false,
                message: "Campo successfully created",
                data: newCampo,
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        const { identificador, nombre, descripcion, tipo, opciones, min, max } = req.body;
        try {
            const campoUpdated = await Campo.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        identificador,
                        nombre,
                        descripcion,
                        tipo,
                        opciones,
                        min,
                        max
                    }
                },
                { new: true }
            );
            if (!campoUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'Campo not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: campoUpdated
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
            const campo = await Campo.findByIdAndRemove(req.params.id);

            if (!campo) {
                return res.status(404).send({
                    success: false,
                    message: 'Campo not found',
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
