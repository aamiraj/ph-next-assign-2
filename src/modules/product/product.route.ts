import express from "express";
import ProductController from "./product.controller";

const productRouter = express.Router();

productRouter
  .route("/:productId")
  .get(ProductController.findAProduct)
  .put(ProductController.updateAProduct)
  .delete(ProductController.deleteAProduct);

productRouter
  .route("/")
  .post(ProductController.createAProduct)
  .get(ProductController.findAllProducts);

export default productRouter;
