import { useEffect, useState } from 'react';

import { useRoom } from "./useRoom";
import { useAuth } from './useAuth';

export function useHome() {
  const [isPublicIcon, setIsPublicIcon] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [isNameInputOpen, setIsNameInputOpen] = useState(false);
  const [isVideoInputOpen, setIsVideoInputOpen] = useState(false);

  const {
    toggleAudio, 
    toggleVideo, 
    isAudioOpen, 
    isVideoOpen,
    setVideoChangeSelected,
    videoOptions,
    videoChangeSelected
  } = useRoom("");

  const {
    addClientName,
    removeClientName,
    clientMediaStream,
    addClientMediaStream
  } = useAuth();

  useEffect(() => {
    removeClientName();

    setVideoChangeSelected("");

    if (clientMediaStream) {
      clientMediaStream.getTracks().forEach(track => {
        track.stop();
      });
    }
  }, []);

  useEffect(() => {
    async function addVideo() {
      if (videoChangeSelected.value) {

        if (clientMediaStream) {
          clientMediaStream.getTracks().forEach(track => {
            track.stop();
          });
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {deviceId: videoChangeSelected.value ? {exact: videoChangeSelected.value} : undefined}
        });

        const videoContainer = document.getElementById("video-container");
        
        let video = document.getElementById("video-element");
        video.muted = true;
        video.srcObject = stream;
        
        video.addEventListener("loadedmetadata", () => {
          video.play();
          videoContainer.appendChild(video);
        });

        addClientMediaStream(stream);
      }
    }
      
    addVideo();
  }, [videoChangeSelected]);

  useEffect(() => {
    if (clientMediaStream) {
      clientMediaStream.getAudioTracks()[0].enabled = isAudioOpen;      
      clientMediaStream.getVideoTracks()[0].enabled = isVideoOpen;

      if (isAudioOpen) {
        document.getElementById("muted-element").style.display = "none";
      } else {
        document.getElementById("muted-element").style.display = "flex";
      }
    }
  }, [clientMediaStream, isAudioOpen, isVideoOpen]);

  function handleSetIcon(IsPublic) {
    setIsPublicIcon(IsPublic);
  }

  function handleInputRoomCodeChange(event) {
    setRoomCode(event.target.value);
  }

  function handleInputNameChange(event) {
    setName(event.target.value);
  }

  function openNameModal(event) {
    event.preventDefault();
    if (roomCode !== "") {
      document.getElementById("roomInput").blur();
      setIsNameInputOpen(true);
    }
  }

  function openVideoModal(event) {
    event.preventDefault();
    setIsNameInputOpen(false);
    setIsVideoInputOpen(true);
  }

  function enterRoom(event) {
    event.preventDefault();
    if (name !== "") {
      setIsVideoInputOpen(false);
      addClientName(name);
      setName("");
      setRoomCode("");

      if (clientMediaStream) {
        clientMediaStream.getTracks().forEach(track => {
          track.stop();
        });
      }

      setVideoChangeSelected("");
    }
  }

  function handleSelectVideo(value) {
    setVideoChangeSelected(value);
  }

  return {
    roomCode,
    isNameInputOpen,
    name,
    openVideoModal,
    handleInputNameChange,
    isVideoInputOpen,
    enterRoom,
    isVideoOpen,
    toggleVideo,
    isAudioOpen,
    toggleAudio,
    videoOptions,
    videoChangeSelected,
    handleSelectVideo,
    openNameModal,
    handleInputRoomCodeChange,
    isPublicIcon,
    handleSetIcon
  }
}