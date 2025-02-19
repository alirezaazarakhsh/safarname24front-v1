// Creating and exporting a function which takes current time in tehran and returns formated time and date of it as an object.
export function getTodayDate(): {
  date: string;
  time: { hour: string; minute: string };
} {
  const now = new Date();

  const tehranTime = new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const hour = tehranTime.find((part) => part.type === "hour")?.value || "00";
  const minute =
    tehranTime.find((part) => part.type === "minute")?.value || "00";

  const persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const isPM = parseInt(hour, 10) >= 12;
  const period = isPM ? "PM" : "AM";

  return {
    date: `TEH ${period} - ${persianDate}`,
    time: { hour, minute },
  };
}
