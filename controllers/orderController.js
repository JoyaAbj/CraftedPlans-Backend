const Order = require("../models/orderModel");
const Planners = require("../models/plannersModel");
const Products = require("../models/productsModel");
// userId cars shipmentId status
const add = async (req, res) => {
  const { userID, planners, products, status, address } = req.body;
  try {
    // Check if required fields are present (you can uncomment and modify this check if needed)
    // if (!userId || !planners || !products || !status || !address)
    //   throw Error("All fields must be filled");

    // Create an order in the database
    const result = await Order.create({ userID, planners, products, status, address });

    // Check if the order creation was successful
    if (!result) throw Error("An error occurred while adding an order");

    // Respond with success message and the created order
    res.status(200).json({ message: "Order added successfully", result });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ message: "Failed to add an order", error: error.message });
  }
};
const getAll = async (_, res) => {
  try {
    const allOrders =await Order.find().populate("userID").populate("products").populate("planners");
    console.log(allOrders)
    if (!allOrders) throw Error("Failed to get all from order");
    res
      .status(200)
      .json({
        message: "all orders retrieved successfully",
        allOrders
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to get all orders",
        error: error.message
      });
  }
};
const findByUserId = async (req, res) => {
  const { userID } = req.params;
  try {
    const resultat = await Order.find({ userId: userID });
    if (!resultat)
      throw Error("An error occured while selecting  orders by userId");
    res
      .status(200)
      .json({ message: "selecting orders by userId successfully", resultat });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get all orders", error: error.message });
  }
};
const updateOrderToDoneById = async(req,res)=>{
  const {Id} = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate({_id:Id},{status:true});
    if(!updatedOrder) throw Error("error while updating order");
    const result=await getOrderById(Id);
    res.status(202).json({message:"order set to done", result})
  } catch (error) {
    res.status(500).json({message:"could not update order", error:error.message})
  }
}

const updateOrderById = async(req,res)=>{
  const {Id} = req.params;
  const {products,planners,address}= req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate({_id:Id},{products,planners,address});
    if(!updatedOrder) throw Error("error while updating order");
    const result=await getOrderById(Id);
    res.status(202).json({message:"order updated successfully",result})
  } catch (error) {
    res.status(500).json({message:"could not update order", error:error.message})
  }
}

const deleteOrder = async (req, res) => {
  const { Id } = req.params;
  try {
      const deletedOrder = await Order.findByIdAndDelete({ _id:Id });
      if (!deletedOrder) throw Error("An error occured");
      res.status(200).json({ message: "Order deleted successfully" ,deletedOrder});
  } catch (error) {
      res.status(500).json({ message: "An error occured during deleting order", error: error.message })
  }
}


const getOrderById = async(Id)=>{
  try {
    const order= await Order.findById({_id:Id});
    return order;
  } catch (error) {
    return error;
  }
}

const selectingOrderData=async(req,res)=>{
  try{
   const orders=await Order.find({})
  .populate({
    path: 'userID',
    model: 'users',
    select: 'fullName phoneNumber email role'
  }).populate({
    path: 'products',
    model: 'products',
    select: 'name description quantity details category price image '
  }).populate({
    path: 'planners',
    model:'planners',
    select: 'cover personalInformation events price pages addOns'
  });
      res.status(200).json({orders});
  }catch(error){
     res.status(500).json({message:"Failed to select order data",error:error.message})
  }
}

const selectingOrderDataByUserId=async(req,res)=>{
  const {ID}=req.params;
  try{
   const orders=await Order.find({userId:ID})
   .populate({
    path: 'products',
    model: 'products',
    select: 'name description quantity details category price image '
  }).populate({
    path: 'planners',
    model:'planners',
    select: 'cover personalInformation events price pages addOns'
  });
      res.status(200).json({orders});
  }catch(error){
     res.status(500).json({message:"Failed to select order data",error:error.message})
  }
}
module.exports = {
    selectingOrderDataByUserId,
    selectingOrderData,
    add,
    getAll,
    findByUserId,
    updateOrderToDoneById,
    updateOrderById,
    deleteOrder
};
