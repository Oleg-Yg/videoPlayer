import { accTimestamp, Timestamp } from "./types";

export function getTimestamp(data: Timestamp[]) {
  return data.reduce((acc: accTimestamp[], element: Timestamp) => {
    const dateTimestamp = new Date(element.timestamp);

    const minutes = dateTimestamp.getMinutes();
    const seconds = dateTimestamp.getSeconds();
    const milliseconds = dateTimestamp.getMilliseconds();

    acc.push({
      id: element.id,
      time: element.timestamp / 1000,
      timestamp: `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`,
    });
    return acc;
  }, []);
}
