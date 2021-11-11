/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth';

export const SettingsContext = createContext({});

export function SettingsContextProvider(props) {

  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const [isClientAudioOpen, setIsClientAudioOpen] = useState(true);
  const [isClientVideoOpen, setIsClientVideoOpen] = useState(true);

  const [videoOptions, setVideoOptions] = useState([{}]);
  const [videoChangeSelected, setVideoChangeSelected] = useState({});

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const [isComplete, setIsComplete] = useState(false);

  const {
    clientMediaStream,
    addClientMediaStream,
  } = useAuth();

  useEffect(() => {    
    async function getVideoTracks() {
      const videos = [];
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.map(device => {
        if (device.kind === "videoinput") {
          if (!(videoOptions.find(video => video.value === device.label))) {
            videos.push({value: device.deviceId, label: "📷 " + device.label})
          }
        }
        return null;
      });
      
      setVideoOptions(videos);
    }

    getVideoTracks();
  }, []);

  useEffect(() => {
    async function addVideo() {
      if (videoChangeSelected.value && !isComplete) {

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
  }, [videoChangeSelected, setIsComplete]);

  useEffect(() => {
    if (clientMediaStream) {
      clientMediaStream.getAudioTracks()[0].enabled = isClientAudioOpen;      
      clientMediaStream.getVideoTracks()[0].enabled = isClientVideoOpen;

      const muteElement = document.getElementById("muted-element");
      if (isClientAudioOpen && muteElement) {
        muteElement.style.display = "none";
      } else if (muteElement) {
        muteElement.style.display = "flex";
      }
    }
  }, [clientMediaStream, isClientAudioOpen, isClientVideoOpen]);

  function handleInputNameChange(event) {
    setName(event.target.value);
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

  function openSettingsModal(event) {
    event && event.preventDefault();
    if (roomCode !== "") {
      const roomInput = document.getElementById("roomInput");
      roomInput && roomInput.blur();
      setIsSettingsModalOpen(true);
    }
  }

  return (
    <SettingsContext.Provider value={{ 
      roomCode,
      setRoomCode,
      name,
      setName,
      handleInputNameChange,
      isClientVideoOpen,
      toggleClientVideo,
      isClientAudioOpen,
      toggleClientAudio,
      videoOptions,
      videoChangeSelected,
      handleSelectVideo,
      openSettingsModal,
      isSettingsModalOpen,
      setIsSettingsModalOpen,
      setIsClientAudioOpen,
      setIsClientVideoOpen,
      isComplete,
      setIsComplete
    }}>
      { props.children }
    </SettingsContext.Provider>
  )
}