import type { Coach } from "../modules/coaches/models/coach.model";
import type { User } from "../modules/auth/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;

      clerkId?: string;

      coach?: Coach;
    }

    interface Response {
      success<T>(data: T, message?: string, statusCode?: number): this;

      error(message: string, statusCode?: number, data?: unknown): this;
    }
  }
}

export {};
