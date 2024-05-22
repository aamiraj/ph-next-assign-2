import { z } from "zod";

const OrderValidation = z.object({
  email: z.string().email(),
  productId: z.string().length(24, { message: "Must 24 charecters long." }),
  price: z.number().nonnegative({ message: "Price can not be negative." }),
  quantity: z
    .number()
    .nonnegative({ message: "Quantity can not be negative." })
    .min(1, { message: "You have to purchase at least one item." }),
});

export default OrderValidation;
