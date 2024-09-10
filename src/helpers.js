export const DAYS = [
  "2024-09-09",
  "2024-09-10",
  "2024-09-11",
  "2024-09-12",
  "2024-09-13",
  "2024-09-14",
];

export const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  weekday: "long",
  timeZone: "Asia/Kolkata",
});
