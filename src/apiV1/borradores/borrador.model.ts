import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const borradorSchema = Schema({
  emailCliente: {
    type: String,
    required: true,
    trim: true,
  },
  documento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documento',
  },
  subcampos: [Schema.Types.Mixed],
  campos: [Schema.Types.Mixed],
  pago: {
    type: String,
    required: true,
  },
  idPagoMP: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

export default mongoose.model('Borrador', borradorSchema);
