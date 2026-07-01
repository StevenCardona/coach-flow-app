import cors from "cors";
import express from "express";

import { FRONTEND_URL } from "./config/env";
import {
  asyncHandler,
  errorHandler,
  notFoundHandler,
  requireAuth,
  responseMiddleware,
} from "./middleware";
import authRoutes from "./modules/auth/routes/auth.routes";
import planRoutes from "./modules/plans/routes/plan.routes";
import studentPlanHistoryRoutes from "./modules/plans/routes/student-plan-history.routes";
import studentOnboardingRoutes from "./modules/students/routes/student-onboarding.routes";
import studentRoutes from "./modules/students/routes/student.routes";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseMiddleware);

app.get("/", (_req, res) => {
  res.success({ status: "ok" }, "API funcionando");
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/students/:studentId/plan-histories", studentPlanHistoryRoutes);
app.use("/api/me/onboarding", studentOnboardingRoutes);

app.get(
  "/api/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.success(
      {
        ...req.user!.toJSON(),
        coachId: req.coach?.id ?? null,
        studentId: req.student?.id ?? null,
      },
      "Usuario obtenido",
    );
  }),
);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
