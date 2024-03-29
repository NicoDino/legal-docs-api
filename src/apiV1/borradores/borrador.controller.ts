import { Request, Response } from 'express';
import Borrador from './borrador.model';
import { launch } from 'puppeteer';
import { sendBorrador } from '../../helpers/mailer';
import { sendLink } from '../mercadopago/mercadopago.helper';
import { ENVIRONMENT } from '../../config.private';
const cheerio = require('cheerio');

const environment = ENVIRONMENT;
export default class BorradorController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const borradors = await Borrador.find().sort({ pago: 1 }).populate('documento');
      if (!borradors) {
        return res.status(404).send({
          success: false,
          message: 'Borradors not found',
          data: null,
        });
      }

      res.send(borradors);
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
      const borrador = await Borrador.findById(req.params.id).populate('documento');
      if (!borrador) {
        return res.status(404).send({
          success: false,
          message: 'Borrador not found',
          data: null,
        });
      }

      res.status(200).send({
        success: true,
        data: borrador,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public create = async (req: Request, res: Response): Promise<any> => {
    const { emailCliente, documento, campos, subcampos, createdAt } = req.body.borrador;
    try {
      const borrador = new Borrador({
        emailCliente,
        documento,
        campos,
        subcampos,
        createdAt,
        pago: 'pendiente',
      });
      const newBorrador = await borrador.save();
      if (environment.toString() === 'LOCAL') {
        /** para testear localmente */
        await this.crearCopia(newBorrador);
        res.status(200).send({
          success: true,
        });
      }
      if (environment.toString() === 'CLOUD') {
        /** Para correr en el servidor */
        sendLink(newBorrador, req, res);
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };

  public reenviar = async (req: Request, res: Response): Promise<any> => {
    try {
      const idBorrador = req.body.borrador._id;
      await this.crearCopia(idBorrador);
      res.status(200).send({
        success: true,
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
    const { emailCliente, documento, campos } = req.body;
    try {
      const borradorUpdated = await Borrador.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            emailCliente,
            documento,
            campos,
          },
        },
        { new: true }
      );
      if (!borradorUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Borrador not found',
          data: null,
        });
      }
      res.status(200).send({
        success: true,
        data: borradorUpdated,
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
      const borrador = await Borrador.findByIdAndRemove(req.params.id);

      if (!borrador) {
        return res.status(404).send({
          success: false,
          message: 'Borrador not found',
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

  public crearCopia = async (idBorrador) => {
    const borrador = await Borrador.findById(idBorrador).populate('documento');
    let rawCopy: string = borrador.documento.html;
    const $ = cheerio.load(borrador.documento.html);
    const campos = borrador.campos;
    const subcampos = borrador.subcampos;
    for (const campo of campos) {
      if (campo && campo.isSubdocumento) {
        $(campo.id).replaceWith(campo.valor);
      } else {
        $(campo.id).text(campo.valor);
      }
    }
    for (const subcampo of subcampos) {
      $(subcampo.id).text(subcampo.valor);
    }
    rawCopy = $.html();
    rawCopy = rawCopy.toString().split('filter: blur(6px);').join('');
    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(rawCopy);
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: false,
      margin: {
        left: '40px',
        top: '60px',
        right: '40px',
        bottom: '40px',
      },
    });
    await browser.close();
    sendBorrador(borrador.emailCliente, buffer, borrador.documento.nombre);
    return buffer;
  };
}
