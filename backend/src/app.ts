import cors from "cors";
import express from "express";

import {
  asyncHandler,
  clerkMiddleware,
  errorHandler,
  notFoundHandler,
  requireAuth,
  responseMiddleware,
} from "./middleware";
import authRoutes from "./modules/auth/routes/auth.routes";
import studentRoutes from "./modules/students/routes/student.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseMiddleware);
app.use(clerkMiddleware);

app.get("/", (_req, res) => {
  res.success({ status: "ok" }, "API funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

app.get(
  "/api/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.success(req.user, "Usuario obtenido");
  }),
);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
