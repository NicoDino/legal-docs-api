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
  campos: [{ type: String }],
  pago: {
    type: String,
    required: true,
  },
  idPagoMP: {
    type: String,
  },
});

export default mongoose.model('Borrador', borradorSchema);
