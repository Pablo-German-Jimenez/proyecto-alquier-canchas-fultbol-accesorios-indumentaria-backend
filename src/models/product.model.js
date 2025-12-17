import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: String, // revisar con Nacho por el "$"
      required: true,
    },
    talles: {
      type: [String],
      required: true,
    },
    imagen: {
      type: String, // URL o path
    },
    categoria: {
      type: String,
      enum: ["ellas", "hombre", "niños", "accesorios"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
