import { Request, Response } from 'express';
import Documento from './documento.model';

export default class DocumentoController {
  /** Usado para popular documentos dentro del arbol en la vista publica
   * solo es necesario retornar id, nombre & id_categoria
   */
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const documentos = await Documento.find({
        padre: null,
      });
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
      const documentos = await Documento.find({
        $or: [
          { nombre: { $regex: busqueda, $options: 'i' } },
          { nombresAlternativos: { $regex: busqueda, $options: 'i' } },
        ],
      });
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

  public findSubdocumentos = async (req: Request, res: Response): Promise<any> => {
    try {
      const padre = req.params.padre;
      const documentos = await Documento.find({
        padre: padre,
      }).populate('campos');
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
      const documento = await Documento.findOne({ _id: req.params.id })
        .populate('categoria')
        .populate({
          path: 'campos',
          populate: { path: 'opcionesSubdocumento.subdocumento', populate: { path: 'campos' } },
        });
      if (!documento) {
        return res.status(404).send({
          success: false,
          message: 'Documento not found',
          data: null,
        });
      }
      documento.campos.sort((a, b) => {
        a.posicion < b.posicion ? -1 : 1;
      });
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
    const {
      nombre,
      nombresAlternativos,
      categoria,
      html,
      tipo,
      referencias,
      preview,
      precio,
      descripcion,
      hojasDesde,
      hojasHasta,
      padre,
    } = req.body;
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
        hojasDesde,
        hojasHasta,
        descripcion,
        padre,
      });
      const newDocumento = await documento.save();
      res.send(newDocumento);
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
      const documento = await Documento.findOne({ _id: documentoUpdated.id }).populate('categoria').populate('campos');
      documento.campos.sort((a, b) => {
        a.posicion < b.posicion ? -1 : 1;
      });
      res.json(documento);
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
