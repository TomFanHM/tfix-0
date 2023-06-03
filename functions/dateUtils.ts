import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

//return XXX days ago or XXX hours ago or XXX minutes ago, etc.
export function fromNow(date: string | Date): string {
  return dayjs(date).fromNow();
}
