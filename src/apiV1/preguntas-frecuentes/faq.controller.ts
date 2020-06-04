import { Request, Response } from 'express';
import Faq from './faq.model';

export default class FaqController {

    public findAll = async (req: Request, res: Response): Promise<any> => {
        try {
            const faqs = await Faq.find();
            if (!faqs) {
                return res.status(404).send({
                    success: false,
                    message: 'Faqs not found',
                    data: null
                });
            }
            res.json(faqs);
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
            const faq = await Faq.findById(req.params.id, { password: 0 });
            if (!faq) {
                return res.status(404).send({
                    success: false,
                    message: 'Faq not found',
                    data: null
                });
            }

            res.status(200).send({
                success: true,
                data: faq
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
        const { pregunta, contenido } = req.body;
        try {
            const faq = new Faq({
                pregunta,
                contenido
            });
            const newFaq = await faq.save();
            res.status(201).send({
                success: false,
                message: "Faq successfully created",
                data: newFaq,
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
        const { pregunta, contenido } = req.body;
        try {
            const faqUpdated = await Faq.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        pregunta,
                        contenido
                    }
                },
                { new: true }
            );
            if (!faqUpdated) {
                return res.status(404).send({
                    success: false,
                    message: 'Faq not found',
                    data: null
                });
            }
            res.status(200).send({
                success: true,
                data: faqUpdated
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
            const faq = await Faq.findByIdAndRemove(req.params.id);

            if (!faq) {
                return res.status(404).send({
                    success: false,
                    message: 'Faq not found',
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
