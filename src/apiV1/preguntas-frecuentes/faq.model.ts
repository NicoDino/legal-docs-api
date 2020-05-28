import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const faqSchema = Schema({
  pregunta: {
    type: String,
    required: true,
    trim: true,
  },
  contenido: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Faq", faqSchema);
