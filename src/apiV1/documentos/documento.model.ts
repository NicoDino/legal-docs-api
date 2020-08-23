import * as mongoose from 'mongoose';

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
    ref: 'Categoria',
  },
  descripcion: {
    type: String,
  },
  html: {
    type: String,
  },
  tipo: {
    type: String,
    enum: ['profesional', 'particular'],
  },
  referencias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Documento',
    },
  ],
  campos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campo',
    },
  ],
  camposInsertados: { type: Number },
  preview: {
    // Base64
    type: String,
  },
  precio: {
    type: Number
  },
  hojasDesde: {
    type: Number
  },
  hojasHasta: {
    type: Number
  },
  padre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documento',
  }
});

export default mongoose.model('Documento', documentoSchema);
