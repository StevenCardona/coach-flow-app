"use client";

import type { ReactNode } from "react";

import { Section, StandaloneFormField } from "@/components/cf";
import { formatDate } from "@/lib/format";
import type { Coach, CurrentUser, Gender, Student } from "@/lib/types/entities";
import { Role } from "@/lib/types/entities";

const genderLabels: Record<Gender, string> = {
  MALE: "Masculino",
  FEMALE: "Femenino",
  OTHER: "Otro",
};

function displayValue(value: string | null | undefined) {
  return value?.trim() ? value : "—";
}

function displayDate(value: string | null | undefined) {
  return value ? formatDate(value) : "—";
}

function displayBoolean(value: boolean) {
  return value ? "Sí" : "No";
}

function displayActiveStatus(value: boolean) {
  return value ? "Activo" : "Inactivo";
}

function ProfileFormSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Section title={title}>
      <div className="grid gap-4">{children}</div>
    </Section>
  );
}

interface ProfileBasicInfoProps {
  user: CurrentUser;
}

function CoachProfileInfo({ coach }: { coach: Coach }) {
  return (
    <ProfileFormSection title="Información del coach">
      <StandaloneFormField
        id="coach-name"
        label="Nombre"
        value={displayValue(coach.name)}
        disabled
      />
      <StandaloneFormField
        id="coach-email"
        label="Correo electrónico"
        type="email"
        value={displayValue(coach.email)}
        disabled
      />
      <StandaloneFormField
        id="coach-status"
        label="Estado"
        value={displayActiveStatus(coach.isActive)}
        disabled
      />
      <StandaloneFormField
        id="coach-created-at"
        label="Registrado"
        value={displayDate(coach.createdAt)}
        disabled
      />
      <StandaloneFormField
        id="coach-updated-at"
        label="Última actualización"
        value={displayDate(coach.updatedAt)}
        disabled
      />
    </ProfileFormSection>
  );
}

function StudentProfileInfo({ student }: { student: Student }) {
  return (
    <div className="space-y-8">
      <ProfileFormSection title="Datos personales">
        <StandaloneFormField
          id="student-name"
          label="Nombre"
          value={displayValue(student.name)}
          disabled
        />
        <StandaloneFormField
          id="student-email"
          label="Correo electrónico"
          type="email"
          value={displayValue(student.email)}
          disabled
        />
        <StandaloneFormField
          id="student-phone"
          label="Teléfono"
          type="tel"
          value={displayValue(student.phoneNumber)}
          disabled
        />
        <StandaloneFormField
          id="student-birthday"
          label="Fecha de nacimiento"
          value={displayDate(student.birthday)}
          disabled
        />
        <StandaloneFormField
          id="student-gender"
          label="Género"
          value={
            student.gender ? genderLabels[student.gender] : "—"
          }
          disabled
        />
      </ProfileFormSection>

      <ProfileFormSection title="Información adicional">
        <StandaloneFormField
          id="student-observations"
          label="Observaciones"
          value={displayValue(student.observations)}
          disabled
        />
        <StandaloneFormField
          id="student-medical-condition"
          label="Condición médica"
          value={displayValue(student.medicalCondition)}
          disabled
        />
      </ProfileFormSection>

      <ProfileFormSection title="Estado">
        <StandaloneFormField
          id="student-personal-info-completed"
          label="Información personal"
          value={displayBoolean(student.personalInfoCompleted)}
          disabled
        />
        <StandaloneFormField
          id="student-onboarding-completed"
          label="Onboarding"
          value={displayBoolean(student.onboardingCompleted)}
          disabled
        />
        <StandaloneFormField
          id="student-status"
          label="Estado de la cuenta"
          value={displayActiveStatus(student.isActive)}
          disabled
        />
        <StandaloneFormField
          id="student-created-at"
          label="Registrado"
          value={displayDate(student.createdAt)}
          disabled
        />
        <StandaloneFormField
          id="student-updated-at"
          label="Última actualización"
          value={displayDate(student.updatedAt)}
          disabled
        />
      </ProfileFormSection>
    </div>
  );
}

export function ProfileBasicInfo({ user }: ProfileBasicInfoProps) {
  if (user.role === Role.COACH) {
    if (!user.coach) {
      return (
        <p className="text-body-sm text-muted-foreground">
          No se encontró la información del coach.
        </p>
      );
    }

    return <CoachProfileInfo coach={user.coach} />;
  }

  if (!user.student) {
    return (
      <p className="text-body-sm text-muted-foreground">
        No se encontró la información del estudiante.
      </p>
    );
  }

  return <StudentProfileInfo student={user.student} />;
}
