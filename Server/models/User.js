// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Meno je povinné."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Priezvisko je povinné."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email je povinný."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Prosím, zadaj platnú emailovú adresu.",
      ],
    },
    password: {
      type: String,
      required: [true, "Heslo je povinné."],
      minlength: [6, "Heslo musí mať minimálne 6 znakov."],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
