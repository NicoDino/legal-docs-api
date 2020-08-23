import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const campoSchema = Schema({
  identificador: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  /** La posicion indica el lugar en donde se encuentra el campo dentro del texto
   *  de esa manera los arrays de campos de c/ documento pueden ordenarse luego de una insercion
   */
  //TODO: debe ser requerido
  posicion: {
    type: Number,
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
    enum: ['boolean', 'opciones', 'input', 'date', 'subdocumento'],
  },
  opciones: {
    type: [String],
  },
  opcionesSubdocumento: {
    type: [{
      value: {
        type: String,
      },
      subdocumento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Documento'
      }
    }],
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
