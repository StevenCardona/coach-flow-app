import {
  Dumbbell,
  Flame,
  Heart,
  PersonStanding,
  Scale,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";

import { Gender, TrainingGoal } from "@/lib/types/entities";

export const genderLabels: Record<Gender, string> = {
  [Gender.MALE]: "Masculino",
  [Gender.FEMALE]: "Femenino",
  [Gender.OTHER]: "Otro",
};

export const genderIcons: Record<Gender, LucideIcon> = {
  [Gender.MALE]: User,
  [Gender.FEMALE]: User,
  [Gender.OTHER]: User,
};

export const trainingGoalLabels: Record<TrainingGoal, string> = {
  [TrainingGoal.WEIGHT_LOSS]: "Pérdida de peso",
  [TrainingGoal.MUSCLE_GAIN]: "Ganancia muscular",
  [TrainingGoal.ENDURANCE]: "Resistencia",
  [TrainingGoal.FLEXIBILITY]: "Flexibilidad",
  [TrainingGoal.GENERAL_FITNESS]: "Fitness general",
};

export const trainingGoalDescriptions: Record<TrainingGoal, string> = {
  [TrainingGoal.WEIGHT_LOSS]: "Reducir grasa y mejorar composición corporal",
  [TrainingGoal.MUSCLE_GAIN]: "Aumentar masa muscular y fuerza",
  [TrainingGoal.ENDURANCE]: "Mejorar capacidad cardiovascular",
  [TrainingGoal.FLEXIBILITY]: "Ganar movilidad y prevenir lesiones",
  [TrainingGoal.GENERAL_FITNESS]: "Salud integral y bienestar",
};

export const trainingGoalIcons: Record<TrainingGoal, LucideIcon> = {
  [TrainingGoal.WEIGHT_LOSS]: Scale,
  [TrainingGoal.MUSCLE_GAIN]: Dumbbell,
  [TrainingGoal.ENDURANCE]: Flame,
  [TrainingGoal.FLEXIBILITY]: PersonStanding,
  [TrainingGoal.GENERAL_FITNESS]: Heart,
};

export const ONBOARDING_PHASES = [
  {
    id: "personal-info" as const,
    label: "Sobre ti",
    description: "Datos personales básicos",
    icon: User,
  },
  {
    id: "body-measurements" as const,
    label: "Tu cuerpo",
    description: "Medidas corporales",
    icon: Scale,
  },
  {
    id: "fitness-goals" as const,
    label: "Tus metas",
    description: "Objetivos de entrenamiento",
    icon: Sparkles,
  },
] as const;

export type OnboardingPhaseId = (typeof ONBOARDING_PHASES)[number]["id"];
