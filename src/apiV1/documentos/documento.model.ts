import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const documentoSchema = Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  nombresAlternativos: {
    type: [String],
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categoria",
  },
  html: {
    type: String,
  },
  tipo: {
    type: String,
    required: true,
    enum: ["profesional", "particular"],
  },
  referencias: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Documento",
  },
  preview: {
    // Base64
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Documento", documentoSchema);
