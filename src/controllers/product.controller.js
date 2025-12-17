import Product from '../models/product.model.js'; 

export const obtenerProducto = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const obtenerProductoPorId = async (req, res) => {
  try {const productPorId = await Product.findById(req.params.id);
    if (!productPorId) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(productPorId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const DEFAULT_IMAGE = "https://res.cloudinary.com/dhihpafup/image/upload/v1765849683/default-product_jkxepr.jpg"; 
export const crearProducto = async (req, res) => {
  try {
    let tallesArray = ["Único"];
    if (req.body.talles) {
      tallesArray = req.body.talles
        .split(",")
        .map((s) => s.trim().toUpperCase());
    }
     console.log("Archivo recibido:", req.file); 
    const nuevoProducto = new Product({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      talles: tallesArray,
      imagen: req.file ? req.file.path : DEFAULT_IMAGE,
      categoria: req.body.categoria,
      
    });
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const productData = {
      nombre: req.body.name,
      descripcion: req.body.description,
      prixw: req.body.price,
      talles: req.body.stock,
      categoria: req.body.category,

    };

    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      productData, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

     if (producto.imagen && producto.imagen !== DEFAULT_IMAGE) {
      const urlParts = producto.imagen.split("/");
      const fileWithExtension = urlParts.pop();
      const publicId = `cancheros/${fileWithExtension.split(".")[0]}`;
      await cloudinary.uploader.destroy(publicId);
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};