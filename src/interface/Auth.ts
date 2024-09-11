import { Request } from "express";

import { IUser } from "./User";

export interface IRequest extends Request {
  user?: Omit<IUser, "password">;
}
