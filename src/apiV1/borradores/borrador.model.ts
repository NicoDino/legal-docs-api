import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import * as autopopulate from 'mongoose-autopopulate';

const borradorSchema = Schema({
  emailCliente: {
    type: String,
    required: true,
    trim: true,
  },
  documento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documento',
    autopopulate: true,
  },
  campos: [{ type: String }],
});

borradorSchema.plugin(autopopulate);

export default mongoose.model('Borrador', borradorSchema);
