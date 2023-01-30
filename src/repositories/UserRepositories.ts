import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const UserRepositories = AppDataSource.getRepository(User);
