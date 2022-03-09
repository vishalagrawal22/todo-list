import { formatDistanceToNow, isPast, format } from "date-fns";

export function formatDateForDatePicker(date) {
  const endDate = new Date(date);
  endDate.setHours(0, 0, 0, 0);
  return format(endDate, "yyyy-MM-dd");
}

export function isExpired(date) {
  const endDate = new Date(date);
  endDate.setHours(0, 0, 0, 0);
  endDate.setDate(endDate.getDate() + 1);
  return isPast(endDate);
}

export function getTimeLeft(date) {
  const endDate = new Date(date);
  endDate.setHours(0, 0, 0, 0);
  endDate.setDate(endDate.getDate() + 1);
  return formatDistanceToNow(endDate);
}

export function formatDate(date) {
  const endDate = new Date(date);
  endDate.setHours(0, 0, 0, 0);
  return format(endDate, "dd / MM / yyyy");
}
