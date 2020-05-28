import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const campoSchema = Schema(
  {
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
      enum: ['boolean','opciones','input']
    },
    opciones:{
      type: [String],

    },
    min:{
      type:Number
    },
    max:{
      type:Number
    }
  }
);

export default mongoose.model("Campo", campoSchema);
