import { Request, Response } from 'express';
import Campo from './campo.model';
import Documento from '../documentos/documento.model';

export default class CampoController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const campos = await Campo.find();
      if (!campos) {
        return res.status(404).send({
          success: false,
          message: 'Campos not found',
          data: null,
        });
      }
      res.json(campos);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const campo = await Campo.findById(req.params.id, { password: 0 });
      if (!campo) {
        return res.status(404).send({
          success: false,
          message: 'Campo not found',
          data: null,
        });
      }
      res.json(campo);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public create = async (req: Request, res: Response): Promise<any> => {
    const { identificador, nombre, descripcion, tipo, ayuda, opciones, opcionesSubdocumento, min, max, documento, posicion } = req.body;
    try {
      const campo = new Campo({
        identificador,
        nombre,
        descripcion,
        tipo,
        ayuda,
        opciones,
        min,
        max,
        documento,
        posicion,
        opcionesSubdocumento
      });

      const newCampo = await campo.save();

      if (newCampo.documento) {
        const promiseArray = [
          this.actualizarDocumento(newCampo),
          this.recalcularPosiciones(newCampo.documento),
          this.marcarSubdocumentosUtilizados(newCampo)
        ];
        await Promise.all(promiseArray);

      }
      res.json(newCampo);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  private async actualizarDocumento(newCampo: any) {
    const documento = await Documento.findById(newCampo.documento);
    documento.campos.push(newCampo._id);
    if (documento.camposInsertados) {
      documento.camposInsertados++;
    } else {
      documento.camposInsertados = 1;
    }
    await documento.save();
  }

  private async recalcularPosiciones(idDocumento) {
    const documento = await Documento.findById(idDocumento).populate('campos').lean();
    let nuevaPosicion = 0;
    const updatePromises = [];
    for (const campo of documento.campos) {
      nuevaPosicion = documento.html.indexOf(campo.identificador);
      updatePromises.push(
        Campo.findByIdAndUpdate(campo._id, {
          $set: { posicion: nuevaPosicion },
        })
      );
    }
    await Promise.all(updatePromises);
  }

  private async marcarSubdocumentosUtilizados(campo) {

    const allSubdocumentos = await Documento.find({
      padre: campo.documento,
    }).lean();
    const subdocumentosUtilizados = campo.opcionesSubdocumento.toObject();
    const promises = [];
    let indice = -1;
    for (const docu of allSubdocumentos) {
      indice = subdocumentosUtilizados.findIndex(subdocu => {
        return subdocu.subdocumento.toString() === docu._id.toString();
      });
      if (indice > -1) {
        promises.push(
          Documento.findByIdAndUpdate(docu._id, {
            $set: { campoAsociado: campo._id },
          })
        );
      }
    }
    await Promise.all(promises);
  }

  public update = async (req: Request, res: Response): Promise<any> => {
    const update = req.body;
    try {
      const campoUpdated = await Campo.findByIdAndUpdate(
        req.params.id,
        {
          $set: update,
        },
        { new: true }
      );
      if (!campoUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Campo not found',
          data: null,
        });
      } else {
        await this.marcarSubdocumentosUtilizados(campoUpdated);
      }
      res.status(200).send({
        success: true,
        data: campoUpdated,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const campo = await Campo.findById(req.params.id).populate('documento');

      if (!campo) {
        return res.status(404).send({
          success: false,
          message: 'Campo not found',
          data: null,
        });
      }

      const documento = campo.documento;
      documento.campos.pull(campo._id);
      // Libera los subdocumentos asociados
      const promises = [];
      for (const opcion of campo.opcionesSubdocumento) {
        promises.push(
          Documento.findByIdAndUpdate(opcion.subdocumento, {
            $set: { campoAsociado: null },
          })
        );
      }
      await Promise.all(promises);
      // ---
      await documento.save();
      await campo.remove();
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  }
}
