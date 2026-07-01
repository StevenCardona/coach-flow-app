import {
  differenceInYears,
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
  type Locale,
} from "date-fns";
import { es } from "date-fns/locale";

type DateInput = Date | string | number | null | undefined;

const DEFAULT_DATE_LOCALE: Locale = es;
const DEFAULT_CURRENCY_LOCALE = "es-CO";

function toDate(value: DateInput): Date | null {
  if (value == null) {
    return null;
  }

  if (value instanceof Date) {
    return isValid(value) ? value : null;
  }

  if (typeof value === "number") {
    const date = new Date(value);
    return isValid(date) ? date : null;
  }

  const date = parseISO(value);
  return isValid(date) ? date : null;
}

export function formatDate(
  value: DateInput,
  pattern = "dd MMM yyyy",
  locale: Locale = DEFAULT_DATE_LOCALE,
): string {
  const date = toDate(value);
  if (!date) {
    return "—";
  }

  return format(date, pattern, { locale });
}

export function formatDateTime(
  value: DateInput,
  locale: Locale = DEFAULT_DATE_LOCALE,
): string {
  return formatDate(value, "dd MMM yyyy, HH:mm", locale);
}

export function formatRelative(
  value: DateInput,
  locale: Locale = DEFAULT_DATE_LOCALE,
): string {
  const date = toDate(value);
  if (!date) {
    return "—";
  }

  return formatDistanceToNow(date, { addSuffix: true, locale });
}

export function calculateAge(value: DateInput): string {
  const date = toDate(value);
  if (!date) {
    return "—";
  }

  const years = differenceInYears(new Date(), date);
  return years >= 0 ? String(years) : "—";
}

export function formatCurrency(
  amount: number,
  currency = "COP",
  locale = DEFAULT_CURRENCY_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "COP" ? 0 : 2,
  }).format(amount);
}
