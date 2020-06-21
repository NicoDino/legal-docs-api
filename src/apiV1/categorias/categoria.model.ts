import * as mongoose from "mongoose";
import * as autopopulate from "mongoose-autopopulate"
const Schema = mongoose.Schema;

const categoriaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["profesional", "particular"],
    },
    padre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
    },
    descendientes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      autopopulate: true
    }],

  }
);

categoriaSchema.plugin(autopopulate);


export default mongoose.model("Categoria", categoriaSchema);
