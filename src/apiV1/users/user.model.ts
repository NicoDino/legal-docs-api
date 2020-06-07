import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.SchemaTypes.String.set('trim', true);

const userSchema = Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    apellido: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

// Guardamos nombres y apellidos siempre upperCase
userSchema.pre('save', function(next){
  const user = this;
  if (user.isModified('nombre')) {
      user.nombre = user.nombre.toUpperCase();
  }
  if (user.isModified('apellido')) {
      user.apellido = user.apellido.toUpperCase();
  }
  next();
})

export default mongoose.model("User", userSchema);
