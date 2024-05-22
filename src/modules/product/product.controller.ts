import { NextFunction, Request, Response } from "express";
import { ProductValidation } from "./product.validation";
import ProductService from "./product.service";

const createAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    const validatedData = ProductValidation.parse(product);
    const result = await ProductService.createAProductInDb(validatedData);

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {searchTerm} = req.query;

    let result: {
      success: boolean;
      message: string;
      data: unknown;
    };

    if (searchTerm) {
      result = await ProductService.findProductsWithSearchTerm(searchTerm as string);
    } else {
      result = await ProductService.findAllProductsFromDB();
    }

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const findAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const result = await ProductService.findAProductFromDb(productId);

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const updateAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const data = req.body;

    const result = await ProductService.updateProductToDb(productId, data);

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const result = await ProductService.deleteAProductFromDb(productId);

    res.json({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createAProduct,
  findAllProducts,
  findAProduct,
  updateAProduct,
  deleteAProduct,
};
