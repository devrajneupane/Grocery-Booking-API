import { TABLE } from "../enums";
import { BaseModel } from "./baseModel";
import { IUser } from "../interface/User";
import { UUID } from "crypto";

export class UserModel extends BaseModel {
  /**
   * @param {IUser} user User data
   */
  static async createUser(user: Omit<IUser, "id">) {
    await this.queryBuilder().transaction(async (trx) => {
      await trx(TABLE.USER).insert({ ...user });
    });
  }

  /**
   * Retrieves user by email
   *
   * @param email User email
   * @returns User object if found
   * @throws Error if user with provided email does not exist
   */
  static async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.queryBuilder()
      .select<IUser[]>("*")
      .table(TABLE.USER)
      .where({ email })
      .first();
    return user!;
  }

  /**
   * Retrieves user by id
   *
   * @param userId User id
   * @returns User object if found
   * @throws Error if user with provided email does not exist
   */
  static async getUserById(userId: UUID): Promise<IUser> {
    const user = await this.queryBuilder()
      .select<IUser[]>("*")
      .table(TABLE.USER)
      .where({ id: userId })
      .first();
    return user!;
  }
}
