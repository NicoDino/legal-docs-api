import * as mongoose from 'mongoose';
import * as autopopulate from 'mongoose-autopopulate';

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
      autopopulate: true,
    },
  ],
  preview: {
    // Base64
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
});
documentoSchema.plugin(autopopulate);

export default mongoose.model('Documento', documentoSchema);
