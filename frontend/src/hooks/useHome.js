/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useHistory } from "react-router";

import { useRoom } from "./useRoom";
import { useAuth } from './useAuth';

export function useHome() {
  const [isPublicIcon, setIsPublicIcon] = useState(true);
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");
  const [isNameInputOpen, setIsNameInputOpen] = useState(false);
  const [isVideoInputOpen, setIsVideoInputOpen] = useState(false);

  const [isClientAudioOpen, setIsClientAudioOpen] = useState(true);
  const [isClientVideoOpen, setIsClientVideoOpen] = useState(true);

  const history = useHistory();

  const {
    setVideoChangeSelected,
    videoOptions,
    videoChangeSelected
  } = useRoom(null);

  const {
    addClientName,
    removeClientName,
    clientMediaStream,
    addClientMediaStream,
    clientPeer,
    addClientPeer
  } = useAuth();

  useEffect(() => {
    removeClientName();

    setVideoChangeSelected("");

    if (clientMediaStream) {
      clientMediaStream.getTracks().forEach(track => {
        track.stop();
      });
      addClientMediaStream(null);
    }
  }, []);

  useEffect(() => {
    if (clientPeer) {
      clientPeer.disconnect();
      addClientPeer(null);
    }
  }, [clientPeer]);

  useEffect(() => {
    async function addVideo() {
      if (videoChangeSelected.value) {

        if (clientMediaStream) {
          clientMediaStream.getTracks().forEach(track => {
            track.stop();
          });
          addClientMediaStream(null);
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
      clientMediaStream.getAudioTracks()[0].enabled = isClientAudioOpen;      
      clientMediaStream.getVideoTracks()[0].enabled = isClientVideoOpen;

      if (isClientAudioOpen) {
        document.getElementById("muted-element").style.display = "none";
      } else {
        document.getElementById("muted-element").style.display = "flex";
      }
    }
  }, [clientMediaStream, isClientAudioOpen, isClientVideoOpen]);

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
    if (name !== "" && clientMediaStream) {
      setIsVideoInputOpen(false);
      addClientName(name);
      history.push(`/room/${roomCode}`)
      setName("");
      setRoomCode("");
      setVideoChangeSelected("");
    }
  }

  function handleSelectVideo(value) {
    setVideoChangeSelected(value);
  }

  function toggleClientVideo() {
    setIsClientVideoOpen(!isClientVideoOpen);
  }

  function toggleClientAudio() {
    setIsClientAudioOpen(!isClientAudioOpen);
  }

  return {
    roomCode,
    isNameInputOpen,
    name,
    openVideoModal,
    handleInputNameChange,
    isVideoInputOpen,
    enterRoom,
    isClientVideoOpen,
    isClientAudioOpen,
    toggleClientVideo,
    toggleClientAudio,
    videoOptions,
    videoChangeSelected,
    handleSelectVideo,
    openNameModal,
    handleInputRoomCodeChange,
    isPublicIcon,
    handleSetIcon
  }
}