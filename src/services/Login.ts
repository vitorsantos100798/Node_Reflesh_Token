import { LoginType } from "../@types/UserType";
import bcrypt from "bcrypt";
import auth from "../config/auth";
import jwt from "jsonwebtoken";
import { RefleshTokenRepositories } from "../repositories/RefleshToken.Repositorie";
import { UserRepositories } from "../repositories/UserRepositories";
import dayjs from "dayjs";

export class LoginService {
  async execute({ email, password }: LoginType) {
    const user = await UserRepositories.findOneBy({ email });

    if (!user) {
      return new Error("User or Password Invalid!");
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      return new Error("User or Password Invalid!");
    }

    const {
      secret_token,
      expires_in_token,
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;
    const { password: _, ...data } = user;

    const token = jwt.sign({ ...data }, secret_token, {
      subject: String(user.id),
      expiresIn: expires_in_token,
    });

    const refleshToken = jwt.sign({ email }, secret_refresh_token, {
      subject: String(user.id),
      expiresIn: expires_in_refresh_token,
    });

    const expires_in_refresh_token_date = dayjs().add(
      expires_refresh_token_days,
      "days"
    );

    const create = await RefleshTokenRepositories.create({
      user_id: String(user.id),
      user: user,
      refresh_token: refleshToken,
      expires_date: expires_in_refresh_token_date,
    });
    await RefleshTokenRepositories.save(create);
    return { token, refleshToken };
  }
}
