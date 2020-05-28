import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriaSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    padre:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
    },
  }
);

export default mongoose.model("Categoria", categoriaSchema);
