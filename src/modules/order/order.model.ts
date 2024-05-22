import { Schema, model, models } from "mongoose";
import TOrder from "./order.interface";

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
  },
  productId: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const Order = models?.Order || model("Order", orderSchema);

export default Order;
