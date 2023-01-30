import { Request, Response } from "express";
import { LoginService } from "../services/Login";

export class LoginController {
  async handler(request: Request, response: Response) {
    const data = request.body;
    const login = new LoginService();

    const auth = await login.execute(data);

    if (auth instanceof Error) {
      return response.status(400).json(auth.message);
    }

    return response.json({ ...auth });
  }
}
