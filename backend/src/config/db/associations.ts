import { AiGenerationLog } from "../../modules/ai/models/ai-generation-log.model";
import { User } from "../../modules/auth/models/user.model";
import { Coach } from "../../modules/coaches/models/coach.model";
import { Comment } from "../../modules/comments/models/comment.model";
import { Exercise } from "../../modules/exercises/models/exercise.model";
import { NutritionalPlanDay } from "../../modules/nutrition/models/nutritional-plan-day.model";
import { NutritionalPlanMeal } from "../../modules/nutrition/models/nutritional-plan-meal.model";
import { NutritionalPlan } from "../../modules/nutrition/models/nutritional-plan.model";
import { MealFood } from "../../modules/nutrition/models/meal-food.model";
import { MealLog } from "../../modules/nutrition/models/meal-log.model";
import { Plan } from "../../modules/plans/models/plan.model";
import { StudentPlanHistory } from "../../modules/plans/models/student-plan-history.model";
import { BodyMeasurement } from "../../modules/students/models/body-measurement.model";
import { FitnessGoal } from "../../modules/students/models/fitness-goal.model";
import { Invitation } from "../../modules/students/models/invitation.model";
import { Student } from "../../modules/students/models/student.model";
import { ExerciseLog } from "../../modules/workouts/models/exercise-log.model";
import { WorkoutDayExercise } from "../../modules/workouts/models/workout-day-exercise.model";
import { WorkoutDay } from "../../modules/workouts/models/workout-day.model";
import { WorkoutPlan } from "../../modules/workouts/models/workout-plan.model";
import { WorkoutSession } from "../../modules/workouts/models/workout-session.model";

export const setupAssociations = () => {
  // User
  User.hasOne(Coach, { foreignKey: "user_id", as: "coachProfile" });
  User.hasOne(Student, { foreignKey: "user_id", as: "studentProfile" });
  User.hasMany(StudentPlanHistory, {
    foreignKey: "registered_by",
    as: "registeredPlanHistories",
  });
  User.hasMany(Exercise, { foreignKey: "created_by", as: "createdExercises" });
  User.hasMany(Comment, { foreignKey: "author_id", as: "comments" });
  User.hasMany(AiGenerationLog, {
    foreignKey: "requested_by",
    as: "aiGenerationLogs",
  });

  // Coach
  Coach.belongsTo(User, { foreignKey: "user_id", as: "user" });
  Coach.hasMany(Plan, { foreignKey: "coach_id", as: "plans" });
  Coach.hasMany(Invitation, { foreignKey: "coach_id", as: "invitations" });
  Coach.hasMany(Student, { foreignKey: "coach_id", as: "students" });
  Coach.hasMany(WorkoutPlan, { foreignKey: "coach_id", as: "workoutPlans" });
  Coach.hasMany(NutritionalPlan, {
    foreignKey: "coach_id",
    as: "nutritionalPlans",
  });

  Plan.belongsTo(Coach, { foreignKey: "coach_id", as: "coach" });
  Plan.hasMany(StudentPlanHistory, {
    foreignKey: "plan_id",
    as: "studentHistories",
  });

  Invitation.belongsTo(Coach, { foreignKey: "coach_id", as: "coach" });
  Invitation.belongsTo(Student, { foreignKey: "student_id", as: "student" });

  Student.belongsTo(User, { foreignKey: "user_id", as: "user" });
  Student.belongsTo(Coach, { foreignKey: "coach_id", as: "coach" });
  Student.hasMany(BodyMeasurement, {
    foreignKey: "student_id",
    as: "bodyMeasurements",
  });
  Student.hasOne(FitnessGoal, { foreignKey: "student_id", as: "fitnessGoal" });
  Student.hasMany(StudentPlanHistory, {
    foreignKey: "student_id",
    as: "planHistories",
  });
  Student.hasMany(WorkoutPlan, {
    foreignKey: "student_id",
    as: "workoutPlans",
  });
  Student.hasMany(WorkoutSession, {
    foreignKey: "student_id",
    as: "workoutSessions",
  });
  Student.hasMany(NutritionalPlan, {
    foreignKey: "student_id",
    as: "nutritionalPlans",
  });
  Student.hasMany(MealLog, { foreignKey: "student_id", as: "mealLogs" });

  StudentPlanHistory.belongsTo(Student, {
    foreignKey: "student_id",
    as: "student",
  });
  StudentPlanHistory.belongsTo(Plan, { foreignKey: "plan_id", as: "plan" });
  StudentPlanHistory.belongsTo(User, {
    foreignKey: "registered_by",
    as: "registrar",
  });

  BodyMeasurement.belongsTo(Student, {
    foreignKey: "student_id",
    as: "student",
  });

  FitnessGoal.belongsTo(Student, { foreignKey: "student_id", as: "student" });

  Exercise.belongsTo(User, { foreignKey: "created_by", as: "creator" });
  Exercise.hasMany(WorkoutDayExercise, {
    foreignKey: "exercise_id",
    as: "workoutDayExercises",
  });

  WorkoutPlan.belongsTo(Student, { foreignKey: "student_id", as: "student" });
  WorkoutPlan.belongsTo(Coach, { foreignKey: "coach_id", as: "coach" });
  WorkoutPlan.belongsTo(WorkoutPlan, {
    foreignKey: "source_template_id",
    as: "sourceTemplate",
  });
  WorkoutPlan.hasMany(WorkoutPlan, {
    foreignKey: "source_template_id",
    as: "derivedPlans",
  });
  WorkoutPlan.hasMany(WorkoutDay, {
    foreignKey: "workout_plan_id",
    as: "workoutDays",
  });

  WorkoutDay.belongsTo(WorkoutPlan, {
    foreignKey: "workout_plan_id",
    as: "workoutPlan",
  });
  WorkoutDay.hasMany(WorkoutDayExercise, {
    foreignKey: "workout_day_id",
    as: "workoutDayExercises",
  });
  WorkoutDay.hasMany(WorkoutSession, {
    foreignKey: "workout_day_id",
    as: "workoutSessions",
  });

  WorkoutDayExercise.belongsTo(WorkoutDay, {
    foreignKey: "workout_day_id",
    as: "workoutDay",
  });
  WorkoutDayExercise.belongsTo(Exercise, {
    foreignKey: "exercise_id",
    as: "exercise",
  });
  WorkoutDayExercise.hasMany(ExerciseLog, {
    foreignKey: "workout_day_exercise_id",
    as: "exerciseLogs",
  });

  WorkoutSession.belongsTo(Student, {
    foreignKey: "student_id",
    as: "student",
  });
  WorkoutSession.belongsTo(WorkoutDay, {
    foreignKey: "workout_day_id",
    as: "workoutDay",
  });
  WorkoutSession.hasMany(ExerciseLog, {
    foreignKey: "workout_session_id",
    as: "exerciseLogs",
  });

  ExerciseLog.belongsTo(WorkoutSession, {
    foreignKey: "workout_session_id",
    as: "workoutSession",
  });
  ExerciseLog.belongsTo(WorkoutDayExercise, {
    foreignKey: "workout_day_exercise_id",
    as: "workoutDayExercise",
  });

  NutritionalPlan.belongsTo(Student, {
    foreignKey: "student_id",
    as: "student",
  });
  NutritionalPlan.belongsTo(Coach, { foreignKey: "coach_id", as: "coach" });
  NutritionalPlan.belongsTo(NutritionalPlan, {
    foreignKey: "source_template_id",
    as: "sourceTemplate",
  });
  NutritionalPlan.hasMany(NutritionalPlan, {
    foreignKey: "source_template_id",
    as: "derivedPlans",
  });
  NutritionalPlan.hasMany(NutritionalPlanDay, {
    foreignKey: "nutritional_plan_id",
    as: "nutritionalPlanDays",
  });

  NutritionalPlanDay.belongsTo(NutritionalPlan, {
    foreignKey: "nutritional_plan_id",
    as: "nutritionalPlan",
  });
  NutritionalPlanDay.hasMany(NutritionalPlanMeal, {
    foreignKey: "nutritional_plan_day_id",
    as: "meals",
  });

  NutritionalPlanMeal.belongsTo(NutritionalPlanDay, {
    foreignKey: "nutritional_plan_day_id",
    as: "nutritionalPlanDay",
  });
  NutritionalPlanMeal.hasMany(MealFood, {
    foreignKey: "meal_id",
    as: "foods",
  });
  NutritionalPlanMeal.hasMany(MealLog, {
    foreignKey: "meal_id",
    as: "mealLogs",
  });

  MealFood.belongsTo(NutritionalPlanMeal, {
    foreignKey: "meal_id",
    as: "meal",
  });

  MealLog.belongsTo(Student, { foreignKey: "student_id", as: "student" });
  MealLog.belongsTo(NutritionalPlanMeal, {
    foreignKey: "meal_id",
    as: "meal",
  });

  Comment.belongsTo(User, { foreignKey: "author_id", as: "author" });

  AiGenerationLog.belongsTo(User, {
    foreignKey: "requested_by",
    as: "requester",
  });
};
