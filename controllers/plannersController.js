
const Planners = require("../models/plannersModel");

const addPlanner = async (req,res) => {
    const {
        cover,
        personalInformation,
        events,
        price,
        pages,
        addOns,
      } = req.body;
      try {
        const planners = await Planners.create({
            cover,
            personalInformation,
            events,
            price,
            pages,
            addOns,
      });
    
       if (!planners) throw Error("An error occurred during adding a new planner");

   res.status(200).json({ message: "New planner added successfully", planners });
    } catch (error) {
   res
     .status(500)
     .json({ message: "Failed to add new planner", error: error.message });
    }
  };

const getPlannerById = async (req, res) => {
    const { Id } = req.params;
    try {
      const planners = await Planners.findById({ _id: Id });
      if (!planners) throw Error("An error occured while getting the planner");
      res.status(200).json({ message: "Planner got successfully", planners });
    } catch (error) {
      res
        .status(500)
        .json({ message: "failed to get the planner", error: error.message });
    }
  };

const getAllPlanners = async (_, res) => {
    try {
      const planners = await Planners.find({});
      res.status(200).json({ message: "All planners retrieved successfully", planners });
    } catch (error) {
      res.status(500).json({
        message: "An error occured while retrieving all planners",
        error: error.message,
      });
    }
  };

  const getPlannerByCover = async (req, res) => {
    const { cover } = req.body;
    try {
      if (!cover) throw Error("No cover detected to continue");
      const planners = await Planners.find({ cover });
      if (!planners)
        throw Error(
          `An error occured while getting planners for this cover ${cover}`
        );
      res.status(200).json({ message: `${cover} planners got successfully`, planners });
    } catch (error) {
      res.status(500).json({
        message: "failed to get planner for this cover ",
        error: error.message,
      });
    }
  };

const deletePlanner = async (req, res) => {
    const { Id } = req.params;
    try {
      const deletedPlanner = await Planners.findByIdAndDelete({ _id: Id });
      if (!deletedPlanner) throw Error("An error occured while removing planner");
      res.status(200).json({ message: "Planner removed successfully", deletedPlanner });
    } catch (error) {
      res.status(500).json({
        message: "An error occured during deleting planner",
        error: error.message,
      });
    }
  };

module.exports = {
    addPlanner,
    getPlannerById,
    getAllPlanners,
    getPlannerByCover,
    updatePlanner,
    deletePlanner,
  };