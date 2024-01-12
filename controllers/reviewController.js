const Review = require("../models/reviewModel");

const add = async (req, res) => {
    const {userID} = req.body;
    const {comment} = req.body;
    const {rating} = req.body;

    try {
        if (!comment || !rating || !userID)
        throw Error("All fields must be filled");
      const result = await Review.create({ comment, rating, userID });
      if (!result) throw Error("An error occured during adding a review");
      res.status(200).json({ message: "A review added successfully", result });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to add a review", error: error.message });
    }
  };

  const getAll = async (req, res) => {
    try {
      const get = await Review.find({});
      if (!get) throw Error("An error occured while getting all reviews");
      res.status(200).json({ message: "Getting all reviews successfully", get });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to select all reviews", error: error.message });
    }
  };

  const getReviewById = async (req, res) => {
    const { Id } = req.params;
    try {
      const get = await Review.findOne({ _id: Id });
      if (!get) throw Error("An error occured while getting a review");
      res.status(200).json({ message: "Getting a review successfully", get });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to select a review", error: error.message });
    }
  };
  
  const deleteReviewById = async (req, res) => {
    const { Id } = req.params;
    try {
      const deleteOne = await Review.findOneAndDelete({ _id: Id });
      if (!deleteOne) throw Error("An error occured while deleting a review");
      res.status(200).json({ message: "Deleting a review successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete a review", error: error.message });
    }
  };
  const updateReviewById = async (req, res) => {
    const { Id } = req.params;
    const { userID, comment, rating } = req.body;
    try {
      if (!userID || !comment || !rating)
        throw Error("All fields must be filled");
      const updateOne = await Review.findOneAndUpdate(
        { _id: Id },
        { userID, comment, rating }
      );
      if (!updateOne) throw Error("An error occured while updating a review");
      res.status(200).json({ message: "A review  updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update a review", error: error.message });
    }
  };
  module.exports = {
    add,
    getAll,
    getReviewById,
    deleteReviewById,
    updateReviewById

  };