import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import * as autopopulate from 'mongoose-autopopulate';

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
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['boolean', 'opciones', 'input'],
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
    autopopulate: true,
  },
});

campoSchema.plugin(autopopulate);

export default mongoose.model('Campo', campoSchema);
