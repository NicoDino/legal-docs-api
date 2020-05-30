import Documento from "./documento.model";
import { Request, Response } from "express";

export async function findAll(req: Request, res: Response) {
  try {
    const documentos = await Documento.find();
    res.json(documentos);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    if (!req.params.id) {
      return res.status(400).send({ message: "Id requerido" });
    }
    const idDocumento = req.params.id;
    const documento = await Documento.findById(idDocumento);
    res.json(documento);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const nuevoDocumento = new Documento(req.body);
    const response = await nuevoDocumento.save();
    res.json(response);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const idDocumento = req.params.id;
    const update = req.body;
    const response = await Documento.findByIdAndUpdate(idDocumento, update, {
      new: true,
    });
    if (!response) {
      return res.status(400).send({
        message: "Documento inexistente",
      });
    }
    res.json(response);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const idDocumento = req.params.id;
    const response = await Documento.findByIdAndDelete(idDocumento);
    if (!response) {
      return res.status(400).send({
        message: "Documento inexistente",
      });
    }
    res.json(response);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}
