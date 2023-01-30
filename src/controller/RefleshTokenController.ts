import { Request, Response } from "express";
import { RefleshTokenService } from "../services/refleshTokenService";

export class RefleshTokenController {
  async refleshToken(request: Request, response: Response) {
    const { token } = request.body;

    const refleshTokenUser = new RefleshTokenService();

    const data = await refleshTokenUser.execute(token);

    return response.status(201).json(data);
  }
}
