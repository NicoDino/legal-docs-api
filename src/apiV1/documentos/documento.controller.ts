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
          data: null,
        });
      }
      res.json(documentos);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public search = async (req: Request, res: Response): Promise<any> => {
    try {
      const busqueda = req.params.busqueda;
      const documentos = await Documento.find({ $or: [{ "nombre": { $regex: busqueda, $options: 'i' } }, { "nombresAlternativos": { $regex: busqueda, $options: 'i' } }] });
      if (!documentos) {
        return res.status(404).send({
          success: false,
          message: 'Documentos not found',
          data: null,
        });
      }
      res.json(documentos);
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
      const documento = await Documento.findOne({ _id: req.params.id }).populate('categoria');
      if (!documento) {
        return res.status(404).send({
          success: false,
          message: 'Documento not found',
          data: null,
        });
      }
      res.json(documento);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public create = async (req: Request, res: Response): Promise<any> => {
    const { nombre, nombresAlternativos, categoria, html, tipo, referencias, preview, precio, descripcion } = req.body;
    try {
      const documento = new Documento({
        nombre,
        nombresAlternativos,
        categoria,
        html,
        tipo,
        referencias,
        preview,
        precio,
        descripcion
      });
      const newDocumento = await documento.save();
      res.status(201).send({
        success: false,
        message: 'Documento successfully created',
        data: newDocumento,
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
    const actualizacion = req.body;
    try {
      const documentoUpdated = await Documento.findByIdAndUpdate(
        req.params.id,
        {
          $set: actualizacion,
        },
        { new: true }
      );
      if (!documentoUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Documento not found',
          data: null,
        });
      }
      res.json(documentoUpdated);
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
      const documento = await Documento.findByIdAndRemove(req.params.id);

      if (!documento) {
        return res.status(404).send({
          success: false,
          message: 'Documento not found',
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
