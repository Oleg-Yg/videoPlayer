export interface Timestamp {
  id: number;
  timestamp: number;
  duration: number;
  zone: Zone;
}

export interface Zone {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ObjectInterface {
  [key: number]: Timestamp;
}

export interface accTimestamp {
  id: number;
  time: number;
  timestamp: string;
}
