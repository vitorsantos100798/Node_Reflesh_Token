import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import { stringify } from "querystring";
import auth from "../config/auth";
import { RefleshTokenRepositories } from "../repositories/RefleshToken.Repositorie";
type JwtasPayload = {
  email: string;
  sub: string;
};
export class RefleshTokenService {
  async execute(refleshToken: string) {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const { email, sub } = jwt.verify(
      refleshToken,
      secret_refresh_token
    ) as JwtasPayload;

    const id = sub;

    const userRefleshToken = await RefleshTokenRepositories.findOne({
      where: {
        user_id: String(id),
        refresh_token: refleshToken,
      },
    });

    if (!userRefleshToken) {
      return new Error("Reflesh Token Does Not Exist");
    }
    await RefleshTokenRepositories.delete({
      id: String(userRefleshToken.id),
    });

    const newToken = jwt.sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });
    const expires_in_refresh_token_date = dayjs().add(
      expires_refresh_token_days,
      "days"
    );

    const create = await RefleshTokenRepositories.create({
      user_id: String(id),
      refresh_token: refleshToken,
      expires_date: expires_in_refresh_token_date,
    });
    await RefleshTokenRepositories.save(create);

    return {
      newToken,
      create,
    };
  }
}
