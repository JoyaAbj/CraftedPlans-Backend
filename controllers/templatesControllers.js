const Templates = require("../models/templatesModel");
const imageUpload = require("../utilities/imageUploader");


const getATemplateById = async (Id) => {
    try {
      const template = await Templates.findById({ _id: Id });
      return template;
    } catch (error) {
      return error;
    }
  };

const getTemplateById = async (req, res) => {
    const { Id } = req.params;
    try {
      const templates = await Templates.findById({ _id: Id });
      if (!templates) throw Error("An error occured while getting the template");
      res.status(200).json({ message: "Template got successfully", templates });
    } catch (error) {
      res
        .status(500)
        .json({ message: "failed to get the template", error: error.message });
    }
  };

  const addTemplate = async (req,res) => {
    const {
        category,
        price,
        name,
      } = req.body;
      let image1,image2,image3 
      if (req.files){
        // console.log(req.files)
        image1 = await imageUpload(req.files[0])
        image2= await imageUpload(req.files[1])
        image3 = await imageUpload(req.files[2])
        
      }
      try {
        const templates = await Templates.create({
            category,
            price,
            name,
            image: [
            image1.downloadURL,image2.downloadURL,image3.downloadURL
        ]
      });
    
       if (!templates) throw Error("An error occurred during adding a new template");

   res.status(200).json({ message: "New Template added successfully", templates });
    } catch (error) {
   res
     .status(500)
     .json({ message: "Failed to add new template", error: error.message });
    }
  };

  const getAllTemplates = async (_, res) => {
    try {
      const templates = await Templates.find({});
      res.status(200).json({ message: "All templates retrieved successfully", templates });
    } catch (error) {
      res.status(500).json({
        message: "An error occured while retrieving all templates",
        error: error.message,
      });
    }
  };

  const deleteTemplate = async (req, res) => {
    const { Id } = req.params;
    try {
      const deletedTemplate = await Templates.findByIdAndDelete({ _id: Id });
      if (!deletedTemplate) throw Error("An error occured while removing template");
      res.status(200).json({ message: "Template removed successfully", deletedTemplate });
    } catch (error) {
      res.status(500).json({
        message: "An error occured during deleting template",
        error: error.message,
      });
    }
  };

  const getTemplateByCategory = async (req, res) => {
    const { category } = req.body;
    try {
      if (!category) throw Error("No category detected to continue");
      const templates = await Templates.find({ category });
      if (!templates)
        throw Error(
          `An error occured while getting templates for this category ${category}`
        );
      res.status(200).json({ message: `${category} templates got successfully`, templates });
    } catch (error) {
      res.status(500).json({
        message: "failed to get templates for this category ",
        error: error.message,
      });
    }
  };

  const getTemplateByName = async (req, res) => {
    const { name } = req.body;
    try {
      if (!name) throw Error("No name detected to continue");
      const templates = await Templates.find({ name });
      if (!templates)
        throw Error(
          `An error occured while getting templates for this name ${name}`
        );
      res.status(200).json({ message: `${name} templates got successfully`, templates });
    } catch (error) {
      res.status(500).json({
        message: "failed to get template for this name ",
        error: error.message,
      });
    }
  };

  const updateTemplate = async (req, res) => {
    const { category, price, name } = req.body;
    const { Id } = req.params;

    try {
        const template = await getATemplateById(Id);

        let image1, image2, image3;
        if (req.files) {
            // Assuming you have three files for images
            image1 = await imageUpload(req.files[0]);
            image2 = await imageUpload(req.files[1]);
            image3 = await imageUpload(req.files[2]);
        }

        const updateData = {
            category,
            price,
            name,
        };

        // If images are provided, add them to the update data
        if (image1 && image2 && image3) {
            updateData.image = [image1.downloadURL, image2.downloadURL, image3.downloadURL];
        }

        const updateTemplate = await Templates.findByIdAndUpdate(
            { _id: Id },
            updateData,
            { new: true } 
        );

        res.status(200).json({ message: "Template updated successfully", template: updateTemplate });
    } catch (error) {
        res.status(500).json({ message: "Failed to update template", error: error.message });
    }
};

  module.exports = {
    getTemplateById,
    addTemplate,
    getAllTemplates,
    deleteTemplate,
    getTemplateByCategory,
    getTemplateByName,
    updateTemplate,
  };