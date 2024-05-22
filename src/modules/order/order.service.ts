import Product from "../product/product.model";
import TOrder from "./order.interface";
import Order from "./order.model";

const createAOrderToDb = async (data: TOrder) => {
  try {
    const product = await Product.findById(data.productId);

    if (!product?._id) {
      return {
        success: false,
        message: "Product does not exist.",
        data: null,
      };
    }

    const result = await Order.create(data);

    return {
      success: true,
      message: "Successfully added an order.",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add an order.",
      data: error,
    };
  }
};

const findAllOrdersFromDb = async () => {
  try {
    const results = await Order.find({});

    return {
      success: false,
      message: "Successfully fetched all the orders.",
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch all orders.",
      data: error,
    };
  }
};

const findOrdersWithEmailFromDb = async (email: string) => {
  try {
    const results = await Order.find({ email });

    return {
      success: true,
      message: "Orders fetched successfully for user email!",
      data: results,
    };
  } catch (error) {
    return {
      success: false,
      message: "Orders fetched failed for user email!",
      data: error,
    };
  }
};

export default {
  createAOrderToDb,
  findAllOrdersFromDb,
  findOrdersWithEmailFromDb,
};