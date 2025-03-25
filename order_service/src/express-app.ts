import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cartRoutes from "./routes/cart.routes"
import orderRoutes from "./routes/order.routes"

const app = express();
app.use(cors());
app.use(express.json());

app.use(cartRoutes);
app.use(orderRoutes)

app.use("/", (req: Request, res: Response, _: NextFunction): any => {
  return res.status(200).json({ message: "I am healthy!" });
});

export default app;
