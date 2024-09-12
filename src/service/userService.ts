import bcrypt from "bcrypt";
import { UUID } from "crypto";

import { ConflictError } from "../error";
import { IUser } from "../interface/User";
import { UserModel } from "../model";

export class UserService {
  /**
   * @param {Omit<IUser, "id">} user User data
   */
  static async createUser(user: Omit<IUser, "id">) {
    const userExists = await this.getUserByEmail(user.email);

    if (userExists)
      throw new ConflictError("User with same email already exists");

    const password = await bcrypt.hash(user.password, 10);

    const data = await UserModel.createUser({
      ...user,
      password: password,
    });

    return {
      message: "User created succesfully",
      data,
    };
  }

  static async getUserByEmail(email: string): Promise<IUser> {
    const user = UserModel.getUserByEmail(email);

    if (!user) {
      throw new Error(`User with email ${email} does not exists`);
    }

    return user!;
  }

  static async getUserById(userId: UUID): Promise<IUser> {
    const user = UserModel.getUserById(userId);

    if (!user) {
      throw new Error(`User with id ${userId} does not exists`);
    }

    return user!;
  }
}
