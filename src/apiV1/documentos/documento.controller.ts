import { Request, Response } from 'express';
import Documento from './documento.model';

export default class DocumentoController {

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const documentos = await Documento.find();
            if (!documentos) {
                return res.status(404).send({
                    success: false,
                    message: 'Documentos not found',
                    data: null
                });
            }
            res.json(documentos);
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
            const documento = await Documento.findById(req.params.id, { password: 0 });
            if (!documento) {
                return res.status(404).send({
                    success: false,
                    message: 'Documento not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: documento
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
        const { nombre, nombresAlternativos, categoria, html, tipo, referencias, preview, precio } = req.body;
        try {
            const documento = new Documento({
                nombre,
                nombresAlternativos,
                categoria,
                html,
                tipo,
                referencias,
                preview,
                precio
            });
            const newDocumento = await documento.save();
            res.status(201).send({
                success: false,
                message: "Documento successfully created",
                data: newDocumento,
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
        const { nombre, nombresAlternativos, categoria, html, tipo, referencias, preview, precio } = req.body;
        try {
            const documentoUpdated = await Documento.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        nombre,
                        nombresAlternativos,
                        categoria,
                        html,
                        tipo,
                        referencias,
                        preview,
                        precio
                    }
                },
                { new: true }
            );
            if (!documentoUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'Documento not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: documentoUpdated
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
            const documento = await Documento.findByIdAndRemove(req.params.id);

            if (!documento) {
                return res.status(404).send({
                    success: false,
                    message: 'Documento not found',
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
