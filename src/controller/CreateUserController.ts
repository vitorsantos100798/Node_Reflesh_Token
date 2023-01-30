import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async create(request: Request, response: Response) {
    const data = request.body;
    const CreateUser = await new CreateUserService().execute(data);

    if (CreateUser instanceof Error) {
      return response.json({ error: CreateUser.message });
    }

    return response.json({ data: CreateUser });
  }
}
