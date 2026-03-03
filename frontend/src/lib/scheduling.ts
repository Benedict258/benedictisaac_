import type { PlanSlug } from "@/data/pricing";

const CALENDAR_BASE = "https://calendar.google.com/calendar/render?action=TEMPLATE";

const pad = (value: number) => value.toString().padStart(2, "0");

const formatDateForCalendar = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

export const buildDiscoveryCallUrl = (
  planName: string,
  durationMinutes = 45
) => {
  const start = new Date();
  start.setDate(start.getDate() + 2);
  start.setHours(15, 0, 0, 0);

  const end = new Date(start.getTime() + durationMinutes * 60000);

  const params = new URLSearchParams({
    text: `Discovery Call — ${planName}`,
    dates: `${formatDateForCalendar(start)}/${formatDateForCalendar(end)}`,
    details: `Discuss project and pricing plan (${planName}).`,
    location: "Zoom or Google Meet",
  });

  return `${CALENDAR_BASE}&${params.toString()}`;
};
