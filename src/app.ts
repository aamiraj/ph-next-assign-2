import express, { NextFunction, Request, Response } from "express";
import productRouter from "./modules/product/product.route";

const app = express();

// express json parser
app.use(express.json());

// router to call products API
app.use("/api/products", productRouter);

app.get("/", async (req, res) => {
  res.send("It's an e-commerce app!");
});

app.all("*", async (req: Request, res: Response) => {
  res.status(404).send({ success: false, message: "Not found." });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error.",
    });
  }
  next();
});

export default app;
