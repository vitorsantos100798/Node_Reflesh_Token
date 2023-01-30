import { CreateUserType } from "../@types/UserType";
import { UserRepositories } from "../repositories/UserRepositories";
import bcrypt from "bcrypt";
export class CreateUserService {
  async execute({ name, email, password }: CreateUserType) {
    const user = await UserRepositories.findOneBy({ email });

    if (user) {
      return new Error("User Already Exists");
    }

    const hash = await bcrypt.hash(password, 8);

    const create = UserRepositories.create({
      name,
      email,
      password: hash,
    });

    await UserRepositories.save(create);

    const { password: _, ...data } = create;
    return data;
  }
}
