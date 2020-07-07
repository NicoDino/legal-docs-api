import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const campoSchema = Schema({
  identificador: {
    type: String,
    required: true,
    trim: true,
  },
  /** Una pequeña explicación del propósito del campo para el cliente */
  descripcion: {
    type: String,
    trim: true,
  },
  /** Una payuda extra para el cliente */
  ayuda: {
    type: String,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['boolean', 'opciones', 'input', 'date'],
  },
  opciones: {
    type: [String],
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  documento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documento',
  },
});

export default mongoose.model('Campo', campoSchema);
