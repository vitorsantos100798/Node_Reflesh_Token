import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import auth from "../config/auth";

export class AuthMiddleware {
  execute(request: Request, response: Response) {
    const { authorization } = request.headers;
    // const { secret_token, secret_refresh_token } = auth;

    // const verifyToken = jwt.verify(authorization, secret_token);
    


  }
}
