export const DAYS = [
  "2024-09-10",
  "2024-09-11",
  "2024-09-12",
  "2024-09-13",
  "2024-09-14",
  "2024-09-23",
  "2024-09-24",


];

export const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  weekday: "long",
  timeZone: "Asia/Kolkata",
});

export const DEPARTMENTS = {
  ARCH: "Bachelor of Architecture",
  CHEMICAL: "Chemical Engineering",
  CIVIL: "Civil Engineering",
  CSE: "Computer Science and Engineering",
  "CSE-AI": "Computer Science and Engineering (AI)",
  ECE: "Electronics and Communication Engineering",
  EEE: "Electrical and Electronics Engineering",
  ER: "Electrical and Computer Engineering",
  ME: "Mechanical Engineering",
};

export const DEPARTMENT_IDS = Object.keys(DEPARTMENTS);
