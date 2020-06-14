import { Request, Response } from 'express';
import Borrador from './borrador.model';

export default class BorradorController {

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const borradors = await Borrador.find();
            if (!borradors) {
                return res.status(404).send({
                    success: false,
                    message: 'Borradors not found',
                    data: null
                });
            }
            res.json(borradors);
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
            const borrador = await Borrador.findById(req.params.id, { password: 0 });
            if (!borrador) {
                return res.status(404).send({
                    success: false,
                    message: 'Borrador not found',
                    data: null
                });
            }
            res.json(borrador);
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            });
        }
    };

    public create = async (req: Request, res: Response): Promise<any> => {
        const { emailCliente, documento, campos } = req.body;
        try {
            const borrador = new Borrador({
                emailCliente,
                documento,
                campos
            });
            const newBorrador = await borrador.save();
            res.status(201).send({
                success: false,
                message: "Borrador successfully created",
                data: newBorrador,
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
        const { emailCliente, documento, campos } = req.body;
        try {
            const borradorUpdated = await Borrador.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        emailCliente,
                        documento,
                        campos
                    }
                },
                { new: true }
            );
            if (!borradorUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'Borrador not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: borradorUpdated
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
            const borrador = await Borrador.findByIdAndRemove(req.params.id);

            if (!borrador) {
                return res.status(404).send({
                    success: false,
                    message: 'Borrador not found',
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
