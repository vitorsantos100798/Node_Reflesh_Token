import { AppDataSource } from "../data-source";
import { RefleshToken } from "../entities/RefleshToken";

export const RefleshTokenRepositories =
  AppDataSource.getRepository(RefleshToken);
