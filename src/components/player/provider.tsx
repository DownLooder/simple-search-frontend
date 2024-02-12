"use client";

import { Video } from "@prisma/client";
import React, { ReactNode, createContext, useContext } from "react";
import ReactPlayer from "react-player";

interface PlayerContextProps {
  playing: boolean;
  volume: number;
  addVideo: (video: Video) => void;
  insert: (video: Video) => void;
  removeVideo: (video: Video) => void;
  togglePlay: (play?: boolean) => void;
  skipVideo: () => void;
  replayVideo: () => void;
  updateVolume: (volume: number) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [video, setVideo] = React.useState<Video>();
  const [playing, setPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(0.5);
  const [muted, setMuted] = React.useState(true);

  const [progress, setProgress] = React.useState({
    playedSeconds: 0,
    loadedSeconds: 0,
  });

  const [videoIndex, setVideoIndex] = React.useState<number>(0);
  const [videoList, setVideoList] = React.useState<Video[]>([]);

  const addVideo = (video: Video) => {
    const prevIdx = videoList.findIndex((v) => v.id === video.id);

    if (prevIdx !== -1 && prevIdx >= videoIndex) {
      console.log("Already added to queue");
      return;
    }

    setVideoList([...videoList, video]);
    console.log(`Added video ${video.title}`);
  };
  const insert = (video: Video) => {
    console.log("inserting", video.id, "to index", videoIndex);
    setVideoList([
      ...videoList.slice(0, videoIndex),
      video,
      ...videoList.slice(videoIndex),
    ]);
  };
  const removeVideo = (video: Video) => {};
  const togglePlay = (play?: boolean) => {
    if (play) {
      setPlaying(play);
    } else {
      setPlaying(!playing);
    }
    console.log("Set playing", playing);
  };
  const skipVideo = () => {};
  const replayVideo = () => {};
  const updateVolume = (volume: number) => {
    if (volume > 0) {
      setMuted(false);
      setVolume(Math.min(volume, 1));
    } else {
      setMuted(true);
      setVolume(0);
    }
  };

  React.useEffect(() => {
    if (videoIndex > videoList.length) {
      setVideoIndex(videoList.length);
    }

    if (videoList.length > 0) {
      setVideo(videoList[Math.max(Math.min(videoIndex, videoList.length), 0)]);
    }

    console.log({ videoList, videoIndex });
  }, [videoList, videoIndex]);

  React.useEffect(() => {
    const canPlay = ReactPlayer.canPlay(video?.webpageUrl as string);

    if (canPlay) {
      setMuted(false);
      // togglePlay(true);
      // console.log(`Attempting to play ${video?.title}`);
    }
  }, [video]);

  const handlePlay = () => {
    setMuted(false);
    togglePlay(true);
  };
  const handlePause = () => {};
  const handleEnded = () => {
    if (videoIndex === videoList.length - 1) {
      setVideoIndex(0);
      togglePlay(false);
      return;
    }

    setVideoIndex(videoIndex + 1);
    console.log(`Ended ${video}`);
  };
  const handleProgress = (e: {
    playedSeconds: number;
    loadedSeconds: number;
  }) => {};

  return (
    <PlayerContext.Provider
      value={{
        playing,
        volume,
        addVideo,
        insert,
        removeVideo,
        togglePlay,
        skipVideo,
        replayVideo,
        updateVolume,
      }}
    >
      {children}
      <ReactPlayer
        url={video?.webpageUrl as string}
        playing={playing}
        muted={muted}
        volume={volume}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        controls
        pip
        // onProgress={handleProgress}
        // style={{ display: "none" }}
        style={{ position: "fixed", zIndex: -10, filter: "blur(12px)" }}
        // width={"100%"}
        // height={"100%"}
      />
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  return useContext(PlayerContext);
}
