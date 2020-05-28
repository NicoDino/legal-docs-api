import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const borradorSchema = Schema({
  emailCliente: {
    type: String,
    required: true,
    trim: true,
  },
  documento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Documento",
  },
  campos: {
    type: [
      {
        identificador: String,
        valor: mongoose.SchemaTypes.Mixed,
      },
    ],
  },
});

export default mongoose.model("Borrador", borradorSchema);
