import type { Request, Response } from "express";

import type { Gender } from "../../../types";
import { studentService } from "../services/student.service";
import type { CreateStudentBody } from "../helpers/student.validation";

export const studentController = {
  async create(req: Request, res: Response) {
    const body = req.body as CreateStudentBody;
    const result = await studentService.createStudentByCoach(req.coach!.id, {
      ...body,
      gender: (body.gender as Gender | null | undefined) ?? null,
    });

    res.success(
      result,
      "Estudiante creado e invitación enviada",
      201,
    );
  },

  async list(req: Request, res: Response) {
    const students = await studentService.getByCoachId(req.coach!.id);
    res.success(students, "Estudiantes obtenidos");
  },

  async getById(req: Request, res: Response) {
    const student = await studentService.getByCoachAndId(
      req.coach!.id,
      req.params.id as string,
    );

    res.success(student, "Estudiante obtenido");
  },

  async deactivate(req: Request, res: Response) {
    const result = await studentService.deactivateStudent(
      req.coach!.id,
      req.params.id as string,
    );

    res.success(result, result.message);
  },

  async remove(req: Request, res: Response) {
    const result = await studentService.deleteStudent(
      req.coach!.id,
      req.params.id as string,
    );

    res.success(result, result.message);
  },
};
