export function timeAgo(dateSubmitted: string | number | Date) {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - new Date(dateSubmitted).getTime()) / 1000,
  );

  const intervals: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const value = Math.floor(diffInSeconds / interval.seconds);
    if (value >= 1) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(-value, interval.unit);
    }
  }
  return "just now";
}
