import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { accTimestamp, ObjectInterface, Timestamp } from "./types";
import { getTimestamp } from "./utils";
import s from "./styles.module.scss";

const VideoPage = () => {
  const [timestamp, setTimestamp] = useState<Timestamp[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [time, setTime] = useState(0);
  const [zones, setZones] = useState<ObjectInterface>({});

  useEffect(() => {
    fetch("http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd")
      .then((response) => response.json())
      .then((json) => setTimestamp(json));
  }, []);

  const sortTimestamp = timestamp.sort((a, b) => a.timestamp - b.timestamp);

  useEffect(() => {
    sortTimestamp.find((timePoint) => {
      if (
        timePoint.timestamp / 1000 <= currentTime &&
        currentTime <= timePoint.timestamp / 1000 + timePoint.duration / 1000
      ) {
        if (zones[timePoint.id]) return;
        setZones((prev) => ({ ...prev, [timePoint.id]: timePoint }));
      } else if (
        currentTime >
        timePoint.timestamp / 1000 + timePoint.duration / 1000
      ) {
        setZones((prev) => {
          const object = prev;
          delete object[timePoint.id];
          return object;
        });
      }
    });
  }, [currentTime]);

  const onChangeTime = (time: number) => {
    setTime(time);
  };

  return (
    <div className={s.videoPage}>
      <div className={s.videoPlayer}>
        <VideoPlayer
          url={
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
          setCurrentTime={setCurrentTime}
          time={time}
        />
        {Object.values(zones).map((zone: Timestamp) => (
          <div
            className={s.rectangle}
            key={zone.id}
            style={{
              width: zone.zone.width,
              height: zone.zone.height,
              left: zone.zone.left,
              top: zone.zone.top,
            }}
          >
            {zone.id}-{zone.timestamp}
          </div>
        ))}
      </div>

      <div>
        <span>Отметки времени</span>
        <ul>
          {getTimestamp(sortTimestamp).map((time: accTimestamp) => (
            <li
              className={s.timestamp}
              key={time.id}
              onClick={() => onChangeTime(time.time)}
            >
              {time.id}-{time.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoPage;
