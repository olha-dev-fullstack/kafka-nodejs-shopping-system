import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // jwt
  const isValidUser = true;
  if (!isValidUser) {
    res.status(403).json({ error: "authorization error" });
    return;
  }

  next();
};

router.post(
  "/cart",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (error) {
        res.status(404).json({ error });
        return;
      }

      const response = await service.CreateCart(
        req.body as CartRequestInput,
        repo
      );
      res.status(200).json(response);
      return;
    } catch (error) {
      res.status(404).json({ error });
      return;
    }
  }
);

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
  // comes from our auth user parsed from JWT
  const response = await service.GetCart(req.body.customerId, repo);
  res.status(200).json(response);
  return;
});

router.patch(
  "/cart/:lineItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const liteItemId = req.params.lineItemId;
    const response = await service.EditCart(
      {
        id: +liteItemId,
        qty: req.body.qty,
      },
      repo
    );
    res.status(200).json(response);
    return;
  }
);

router.delete(
  "/cart/:lineItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const liteItemId = req.params.lineItemId;
    console.log(liteItemId);
    const response = await service.DeleteCart(+liteItemId, repo);
    res.status(200).json(response);
    return;
  }
);

export default router;
