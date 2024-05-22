import { NextFunction, Request, Response } from "express";
import OrderService from "./order.service";
import OrderValidation from "./order.validation";

const createAOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const validationResult = OrderValidation.safeParse(data);

    if (validationResult.success) {
      const result = await OrderService.createAOrderToDb(validationResult.data);

      res.send({
        success: result.success,
        message: result.message,
        data: result.data,
      });
    } else {
      res.send({
        success: validationResult.success,
        message: "Validation failed, please insert correct data.",
        error: validationResult.error,
      });
    }
  } catch (error) {
    next(error);
  }
};

const findAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;

    let result: {
      success: boolean;
      message: string;
      data: unknown;
    };

    if (email) {
      result = await OrderService.findOrdersWithEmailFromDb(email as string);
    } else {
      result = await OrderService.findAllOrdersFromDb();
    }

    res.send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  createAOrder,
  findAllOrders,
};
