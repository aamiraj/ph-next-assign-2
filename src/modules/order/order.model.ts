import { Schema, model, models } from "mongoose";
import TOrder from "./order.interface";
import Product from "../product/product.model";

const orderSchema = new Schema<TOrder>(
  {
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
  },
  {
    timestamps: true,
  }
);

orderSchema.post("save", async function (doc) {
  const productId = doc?.productId;
  const product = await Product.findById(productId, "inventory");

  const inventory = product?.inventory?.quantity;
  const order = doc?.quantity;
  const remaining = inventory - order;

  if (remaining === 0) {
    product.inventory.inStock = false;
  }

  product.inventory.quantity = remaining;

  await product.save();
});

const Order = models?.Order || model("Order", orderSchema);

export default Order;
