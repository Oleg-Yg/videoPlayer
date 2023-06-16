import React, { useEffect, useRef } from "react";
import { VideoPlayerProps } from "./types";

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  setCurrentTime,
  time,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
  }, [time, videoRef]);

  const getCurrDuration = (e: React.ChangeEvent<HTMLVideoElement>) => {
    setCurrentTime(Number(e.currentTarget.currentTime));
  };

  return (
    <video
      ref={videoRef}
      src={url}
      onTimeUpdate={getCurrDuration}
      controls={true}
    />
  );
};

export default VideoPlayer;
