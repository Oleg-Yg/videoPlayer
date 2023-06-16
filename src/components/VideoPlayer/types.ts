export interface VideoPlayerProps {
  url: string;
  setCurrentTime: (number: number) => void;
  time: number;
}
