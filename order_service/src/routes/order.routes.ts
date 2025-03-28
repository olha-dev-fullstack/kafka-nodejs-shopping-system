import express, { NextFunction, Request, Response } from "express";
import { MessageBroker } from "../utils";
import { OrderEvent } from "../types";

const router = express.Router();

router.post(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    // order create logic

    // 3rd step: publish the message
    await MessageBroker.publish({
      topic: "OrderEvents",
      headers: { token: req.headers.authorization },
      event: OrderEvent.CREATE_ORDER,
      message: {
        orderId: 1,
        items: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 2,
          },
        ],
      },
    });

    res.status(200).json({ message: "create order" });
    return;
  }
);

router.get(
  "/order",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "create order" });
    return;
  }
);

router.get(
  "/order/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "create order" });
    return;
  }
);

router.delete(
  "/order/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "create order" });
    return;
  }
);

export default router;
