const Products = require("../models/productsModel");
const imageUpload = require("../utilities/imageUploader");


const getAProductById = async (Id) => {
    try {
      const product = await Products.findById({ _id: Id });
      return product;
    } catch (error) {
      return error;
    }
  };

const getProductById = async (req, res) => {
    const { Id } = req.params;
    try {
      const products = await Products.findById({ _id: Id });
      if (!products) throw Error("An error occured while getting the product");
      res.status(200).json({ message: "Product got successfully", products });
    } catch (error) {
      res
        .status(500)
        .json({ message: "failed to get the product", error: error.message });
    }
  };

  const addProduct = async (req,res) => {
    const {
        price,
        name,
        description,
        quantity,
        details,
        category,
      } = req.body;
      let image1,image2,image3 
      if (req.files){
        // console.log(req.files)
        image1 = await imageUpload(req.files[0])
        image2= await imageUpload(req.files[1])
        image3 = await imageUpload(req.files[2])
        
      }
      try {
        const products = await Products.create({
        price,
        name,
        description,
        quantity,
        details,
        category,
        image: [
            image1.downloadURL,image2.downloadURL,image3.downloadURL
        ]
      });
    
       if (!products) throw Error("An error occurred during adding a new product");

   res.status(200).json({ message: "New Product added successfully", products });
    } catch (error) {
   res
     .status(500)
     .json({ message: "Failed to add new product", error: error.message });
    }
  };

  const getAllProducts = async (_, res) => {
    try {
      const products = await Products.find({});
      res.status(200).json({ message: "All products retrieved successfully", products });
    } catch (error) {
      res.status(500).json({
        message: "An error occured while retrieving all products",
        error: error.message,
      });
    }
  };

  const deleteProduct = async (req, res) => {
    const { Id } = req.params;
    try {
      const deletedProduct = await Products.findByIdAndDelete({ _id: Id });
      if (!deletedProduct) throw Error("An error occured while removing product");
      res.status(200).json({ message: "Product removed successfully", deletedProduct });
    } catch (error) {
      res.status(500).json({
        message: "An error occured during deleting product",
        error: error.message,
      });
    }
  };

  const getProductByCategory = async (req, res) => {
    const { category } = req.body;
    try {
      if (!category) throw Error("No category detected to continue");
      const products = await Products.find({ category });
      if (!products)
        throw Error(
          `An error occured while getting products for this category ${category}`
        );
      res.status(200).json({ message: `${category} products got successfully`, products });
    } catch (error) {
      res.status(500).json({
        message: "failed to get product for this category ",
        error: error.message,
      });
    }
  };

  const getProductByName = async (req, res) => {
    const { name } = req.body;
    try {
      if (!name) throw Error("No name detected to continue");
      const products = await Products.find({ name });
      if (!products)
        throw Error(
          `An error occured while getting products for this category ${name}`
        );
      res.status(200).json({ message: `${name} products got successfully`, products });
    } catch (error) {
      res.status(500).json({
        message: "failed to get product for this name ",
        error: error.message,
      });
    }
  };

  const updateProduct = async (req, res) => {
    const {
        price,
        name,
        description,
        quantity,
        details,
        category,
      } = req.body;
    const { Id } = req.params;
  
    try {
      const car = await getAProductById(Id);
      
      
      
  
      const updatedProduct = await Products.findByIdAndUpdate(
        { _id: Id },
        {
            price,
            name,
            description,
            quantity,
            details,
            category,
        }
      );
  
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update product", error: error.message });
    }
  };

  const reduceQty = async (req, res) => {
    const { Id } = req.params;
    try {
      const old = await Products.findOne({_id:Id});
      const product = await Products.findByIdAndUpdate({_id:Id},{quantity:old.quantity-1});
      res.status(200).json({ message: "products retrieved successfully", product });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "products not retrieved successfully",
          error: error.message,
        });
    }
  };
  


  module.exports = {
    getProductById,
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductByCategory,
    getProductByName,
    updateProduct,
    reduceQty
  };