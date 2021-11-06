/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { createSocket } from "../services/socket";
import { useAuth } from "./useAuth";

export function useRoom() {
  const [socket, setSocket] = useState(null);
  const {
    clientUsername, 
    login, 
    logout, 
    clientMediaStream, 
    addClientMediaStream, 
    clientPeer, 
    addClientPeer
  } = useAuth();

  useEffect(() => {
    if (socket === null) {
      setSocket(createSocket());
    }
  }, [socket]);

  useEffect(() => {
    async function startClientVideo(){   
      if (clientUsername !== "" && socket !== null) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });

        addVideo(stream, clientUsername, socket.id, true);
        addClientMediaStream(stream);
      } 
    }
    startClientVideo();
  }, [clientUsername, socket]);

  function addVideo(mediaStream, username, socketId, isMuted) {   
    if (!(document.getElementById("VIDEO-CONTAINER-" + socketId))) {      
      const videoGrid = document.getElementById("video_grid");
      const videoContainer = document.createElement("div");
      const nameComponent = document.createElement("span");
      const video = document.createElement("video");
      
      video.id = "VIDEO-" + socketId;
      nameComponent.innerHTML = username;
      
      videoContainer.className = "video_container";
      videoContainer.id = "VIDEO-CONTAINER-" + socketId;
      
      video.muted = isMuted;
      video.srcObject = mediaStream;

      video.addEventListener("loadedmetadata", () => {
        video.play();
        videoContainer.appendChild(video);
        videoContainer.appendChild(nameComponent);
        videoGrid.appendChild(videoContainer);
      })
    }
  }
  
  return {}
}