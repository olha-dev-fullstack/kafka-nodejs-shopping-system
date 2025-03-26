import { NextFunction, Request, Response } from "express";
import { ValidateUser } from "../utils";

export const RequestAuthorizer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers.authorization);
    
    if (!req.headers.authorization) {
      res
        .status(403)
        .json({ error: "Unauthorized due to authorization token missing!" });
      return;
    }
    const userData = await ValidateUser(req.headers.authorization as string);
    req.user = userData;
    next();
  } catch (error) {
    res.status(403).json({ error });
    return;
  }
};
