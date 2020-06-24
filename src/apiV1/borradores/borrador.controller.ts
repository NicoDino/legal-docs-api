import { Request, Response } from 'express';
import Borrador from './borrador.model';
import { launch } from 'puppeteer';
export default class BorradorController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const borradors = await Borrador.find();
      if (!borradors) {
        return res.status(404).send({
          success: false,
          message: 'Borradors not found',
          data: null,
        });
      }

      res.status(200).send({
        success: true,
        data: borradors,
      });
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
      const borrador = await Borrador.findById(req.params.id, { password: 0 });
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
    const { emailCliente, documento, campos } = req.body;
    try {
      const borrador = new Borrador({
        emailCliente,
        documento,
        campos,
      });
      const newBorrador = await borrador.save();
      res.json(newBorrador);
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

  public createCopy = async (req: Request, res: Response): Promise<any> => {
    try {
      const borrador = await Borrador.findById(req.params.id, { password: 0 });
      if (!borrador) {
        return res.status(404).send({
          success: false,
          message: 'Borrador not found',
          data: null,
        });
      }
      console.log(borrador);
      let rawCopy: string = borrador.documento.html;
      const campos = borrador.campos;
      campos.forEach((campo) => {
        rawCopy = rawCopy.replace('__________', campo);
      });
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
      res.contentType('application/pdf');
      res.send(buffer);

      //   res.json(rawCopy);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null,
      });
    }
  };
}
