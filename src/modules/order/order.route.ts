import express from "express";
import OrderController from "./order.controller";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(OrderController.createAOrder)
  .get(OrderController.findAllOrders);

export default orderRouter;
