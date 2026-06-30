import { bodyMeasurementRepository } from "../repositories/body-measurement.repository";
import { fitnessGoalRepository } from "../repositories/fitness-goal.repository";
import { studentRepository } from "../repositories/student.repository";

export async function checkAndMarkOnboardingComplete(studentId: string) {
  const student = await studentRepository.findById(studentId);

  if (!student || student.onboardingCompleted) {
    return;
  }

  if (!student.personalInfoCompleted) {
    return;
  }

  const fitnessGoal = await fitnessGoalRepository.findByStudentId(studentId);

  if (!fitnessGoal) {
    return;
  }

  const measurements =
    await bodyMeasurementRepository.findAllByStudentId(studentId);

  if (measurements.length === 0) {
    return;
  }

  await studentRepository.setOnboardingCompleted(studentId, true);
}
