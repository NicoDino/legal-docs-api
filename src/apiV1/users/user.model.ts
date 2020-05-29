import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

mongoose.SchemaTypes.String.set("trim", true);

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

// Guardamos nombres y apellidos siempre upperCase
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("name")) {
    user.name = user.name.toUpperCase();
  }
  if (user.isModified("lastName")) {
    user.lastName = user.lastName.toUpperCase();
  }
  next();
});

export default mongoose.model("User", userSchema);
