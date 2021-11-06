/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Peer from "peerjs";

import { createSocket } from "../services/socket";
import { useAuth } from "./useAuth";

export function useRoom(roomId) {
  const [socket, setSocket] = useState(null);
  const {
    clientUsername, 
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

  useEffect(() => {
    if (clientMediaStream !== null && socket !== null) {
      const peer = new Peer({
        host: "localhost",
        port: 3333,
        path: "/peerjs"
      });

      addClientPeer(peer);
        
      peer.on("open", (peerId) => {  
        socket.emit("join-room", {peerId, roomId, username: clientUsername});
      });
      
      socket.on("user-connected", ({peerId, name, socketID}) => {
        const call = peer.call(
          peerId, 
          clientMediaStream, 
          {metadata: {username: clientUsername, socketId: socket.id}}
        );
        
        let videoConnected = false;
        call.on("stream", (userVideoStream) => {
          if (!videoConnected) {
            addVideo(userVideoStream, name, socketID, false);
            videoConnected = true;
          }
        })
      });
      
      peer.on("call", (call) => {   
        call.answer(clientMediaStream);
        
        let videoConnected = false;
        call.on("stream", (userVideoStream) => {               
          if (!videoConnected) {
            addVideo(userVideoStream, call.metadata.username, call.metadata.socketId, false);
            videoConnected = true;
          }
        });
      });
    }
  }, [clientMediaStream, socket]);

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