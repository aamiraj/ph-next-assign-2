import { Schema, model, models } from "mongoose";
import { TProduct } from "./product.interface";

const variantSchema = new Schema(
  {
    type: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  {
    _id: false,
  }
);

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      unique: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
    },
    tags: [
      {
        type: String,
      },
    ],
    variants: [{ type: variantSchema, required: false }],
    inventory: {
      quantity: {
        type: Number,
        required: [true, "Quantity of product in inventory is required."],
      },
      inStock: {
        type: Boolean,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = models?.Product || model("Product", productSchema);

export default Product;
