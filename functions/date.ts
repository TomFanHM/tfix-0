import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

//return XXX days ago or XXX hours ago or XXX minutes ago, etc.
export function fromNow(date: string | Date): string {
  return dayjs(date).fromNow();
}

export function getTodayString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  const formattedDay = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

export function getToday() {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

export function getNextMonth(year: number, month: number) {
  let next = month + 1;
  if (next > 12) return { year: year + 1, month: 1 };
  return { year: year, month: next };
}

export function getPrevMonth(year: number, month: number) {
  let prev = month - 1;
  if (prev < 1) return { year: year - 1, month: 12 };
  return { year: year, month: prev };
}

export function getSpecifiedMonthDays(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

//get today's date in dd/mm/yy format
export function getDate(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return `${day}/${month}/${year}`;
}
