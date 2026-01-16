export function getMonthDay(isoString: string | number | Date) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}
