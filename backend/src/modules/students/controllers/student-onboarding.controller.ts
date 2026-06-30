import type { Request, Response } from "express";

import { bodyMeasurementService } from "../services/body-measurement.service";
import { fitnessGoalService } from "../services/fitness-goal.service";
import { studentPersonalInfoService } from "../services/student-personal-info.service";
import type {
  CreateBodyMeasurementBody,
  CreateFitnessGoalBody,
  CreatePersonalInfoBody,
  UpdateBodyMeasurementBody,
  UpdateFitnessGoalBody,
  UpdatePersonalInfoBody,
} from "../helpers/student-onboarding.validation";

export const studentOnboardingController = {
  async createPersonalInfo(req: Request, res: Response) {
    const body = req.body as CreatePersonalInfoBody;
    const result = await studentPersonalInfoService.create(
      req.student!.id,
      body,
    );

    res.success(result, "Información personal registrada", 201);
  },

  async updatePersonalInfo(req: Request, res: Response) {
    const body = req.body as UpdatePersonalInfoBody;
    const result = await studentPersonalInfoService.update(
      req.student!.id,
      body,
    );

    res.success(result, "Información personal actualizada");
  },

  async getPersonalInfo(req: Request, res: Response) {
    const result = await studentPersonalInfoService.get(req.student!.id);
    res.success(result, "Información personal obtenida");
  },

  async createBodyMeasurement(req: Request, res: Response) {
    const body = req.body as CreateBodyMeasurementBody;
    const result = await bodyMeasurementService.create(req.student!.id, body);

    res.success(result, "Medida corporal registrada", 201);
  },

  async updateBodyMeasurement(req: Request, res: Response) {
    const body = req.body as UpdateBodyMeasurementBody;
    const result = await bodyMeasurementService.update(
      req.student!.id,
      req.params.id as string,
      body,
    );

    res.success(result, "Medida corporal actualizada");
  },

  async listBodyMeasurements(req: Request, res: Response) {
    const result = await bodyMeasurementService.listByStudentId(req.student!.id);
    res.success(result, "Medidas corporales obtenidas");
  },

  async createFitnessGoal(req: Request, res: Response) {
    const body = req.body as CreateFitnessGoalBody;
    const result = await fitnessGoalService.create(req.student!.id, body);

    res.success(result, "Objetivos registrados", 201);
  },

  async updateFitnessGoal(req: Request, res: Response) {
    const body = req.body as UpdateFitnessGoalBody;
    const result = await fitnessGoalService.update(req.student!.id, body);

    res.success(result, "Objetivos actualizados");
  },

  async getFitnessGoal(req: Request, res: Response) {
    const result = await fitnessGoalService.getByStudentId(req.student!.id);
    res.success(result, "Objetivos obtenidos");
  },
};
