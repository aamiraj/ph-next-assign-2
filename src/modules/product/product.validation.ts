import { z } from "zod";

export const ProductValidation = z.object({
  name: z
    .string({
      required_error: "Product name is required.",
    })
    .min(3, {
      message: "Must be 3 or more charecters long.",
    })
    .max(30, {
      message: "Maximum number of charecters excceded, max 30.",
    })
    .trim(),
  description: z
    .string()
    .max(200, {
      message: "Maximum number of charecters excceded, max 200.",
    })
    .optional(),
  price: z
    .number({
      required_error: "Product price is required.",
      invalid_type_error: "Price must be a number type.",
    })
    .nonnegative(),
  category: z.string({
    required_error: "Product category is neccessary.",
  }),
  tags: z.string().array().optional(),
  variants: z
    .object({
      type: z.string(),
      value: z.string(),
    })
    .array()
    .optional(),
  inventory: z.object({
    quantity: z
      .number({
        required_error: "Product quantity is required.",
        invalid_type_error: "Quantity must be a number type.",
      })
      .int({
        message: "Quantity must be an integer.",
      })
      .nonnegative({
        message: "Quantity cannot be negative number.",
      }),
    inStock: z.boolean(),
  }),
});
