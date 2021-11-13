/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import {toast} from 'react-toastify';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { api } from '../services/api';

export const SettingsContext = createContext({});

export function SettingsContextProvider(props) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(false);

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
    clientData
  } = useAuth();
  
  const {
    setIsPrivateRoom
  } = useRoom(roomCode);

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

  function openSettingsModal(room_code) {
    setRoomCode(room_code);

    if (room_code) {
      const roomInput = document.getElementById("roomInput");
      roomInput && roomInput.blur();
      setIsSettingsModalOpen(true);
    }
  }

  async function handleEnterRoom(event) {
    event && event.preventDefault();
    setIsValidating(true);
    setError(false);

    if (roomCode !== "") {
      try {
        const {data} = await api.get(`/rooms/${roomCode}`);
        openSettingsModal(data.roomCode);
      } catch (error) {
        toast.error("Sala não existe");
        setIsValidating(false);
        setError(true);
      }
    }
  }

  async function handleCreateRoom(isPrivate) {
    try {
      const {data} = await api.post("/room", {isPrivate, adminId: clientData.id, usersAllowed: [clientData.email]});
      openSettingsModal(data.roomCode);
    } catch (error) {
      toast.error("Server Error");
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
      setIsComplete,
      handleEnterRoom,
      isValidating,
      error,
      handleCreateRoom
    }}>
      { props.children }
    </SettingsContext.Provider>
  )
}