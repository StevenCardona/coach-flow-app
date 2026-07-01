import type { Request, Response } from "express";

import type { Gender } from "../../../types";
import {
  parsePaginationQuery,
} from "../../../helpers/pagination.util";
import type { PaginationQueryInput } from "../../../helpers/pagination.validation";
import { getValidatedQuery } from "../../../helpers/validation.helper";
import { studentService } from "../services/student.service";
import type {
  CreateStudentBody,
  UpdateStudentBody,
} from "../helpers/student.validation";

export const studentController = {
  async create(req: Request, res: Response) {
    const body = req.body as CreateStudentBody;
    const result = await studentService.createStudentByCoach(req.coach!.id, {
      ...body,
      gender: (body.gender as Gender | null | undefined) ?? null,
    });

    res.success(result, "Estudiante creado correctamente", 201);
  },

  async list(req: Request, res: Response) {
    const query = parsePaginationQuery(
      getValidatedQuery<PaginationQueryInput>(req),
    );
    const result = await studentService.listByCoach(req.coach!.id, query);

    res.success(result, "Estudiantes obtenidos");
  },

  async stats(req: Request, res: Response) {
    const stats = await studentService.getStatsByCoach(req.coach!.id);

    res.success(stats, "Estadísticas de estudiantes obtenidas");
  },

  async getById(req: Request, res: Response) {
    const student = await studentService.getByCoachAndId(
      req.coach!.id,
      req.params.id as string,
    );

    res.success(student, "Estudiante obtenido");
  },

  async update(req: Request, res: Response) {
    const body = req.body as UpdateStudentBody;
    const student = await studentService.updateStudentByCoach(
      req.coach!.id,
      req.params.id as string,
      {
        ...body,
        gender: (body.gender as Gender | null | undefined) ?? undefined,
      },
    );

    res.success(student, "Estudiante actualizado");
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
