import type { Coach } from "../../coaches/models/coach.model";
import type { User } from "../models/user.model";

export interface RegisterCoachInput {
  name: string;
  email: string;
}

export interface RegisterCoachResponse {
  user: User;
  coach: Coach;
}
