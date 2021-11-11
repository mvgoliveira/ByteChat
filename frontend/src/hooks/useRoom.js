/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Peer from "peerjs";

import { createSocket } from "../services/socket";
import { useAuth } from "./useAuth";
import { useHome } from "./useHome";

export function useRoom(roomCode) {
  const [socket, setSocket] = useState(null);
  const history = useHistory();

  const [isAudioOpen, setIsAudioOpen] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(true);

  const [videoOptions, setVideoOptions] = useState([{}]);
  const [videoChangeSelected, setVideoChangeSelected] = useState({});
  
  const {
    logout,
    clientUsername, 
    clientMediaStream, 
    addClientMediaStream, 
    clientPeer, 
    addClientPeer
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
    if (socket === null && roomCode) {
      const socket = createSocket(); 
      
      socket.on('connect', () => {
        setSocket(socket);  
      });
    }
  }, [socket, roomCode]);

  useEffect(() => {
    async function startClientVideo(){   
      if (clientUsername !== "" && socket && roomCode) {
        if (!clientMediaStream) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          });
          addClientMediaStream(stream);
        }

        addClientVideo(clientMediaStream, clientUsername, socket.id);
      } 
    }
    startClientVideo();
  }, [clientUsername, socket, clientMediaStream]);

  useEffect(() => {
    if (clientMediaStream !== null && socket !== null && !videoChangeSelected.value) {
      const peer = new Peer({
        host: "localhost",
        port: 3333,
        path: "/peerjs"
      });

      peer.on("open", (peerId) => {  
        socket.emit("join-room", {peerId, roomCode, username: clientUsername});
      });

      addClientPeer(peer);
    }
  }, [clientMediaStream, socket]);

  useEffect(() => {
    if (clientPeer && clientMediaStream !== null && roomCode) {     
      socket.on("user-connected", ({peerId, name, socketID}) => {

        if (clientMediaStream.active === true) {
          const call = clientPeer.call(
            peerId, 
            clientMediaStream, 
            {metadata: {username: clientUsername, socketId: socket.id}}
          );
          
          let videoConnected = false;
          call.on("stream", (userVideoStream) => {
            if (!videoConnected) {
              addPeerVideo(userVideoStream, name, socketID);
              videoConnected = true;
            }
          })
        }
      });
      
      clientPeer.on("call", (call) => {
        call.answer(clientMediaStream);
        
        let videoConnected = false;
        call.on("stream", (userVideoStream) => {   
          if (!videoConnected) {
            addPeerVideo(userVideoStream, call.metadata.username, call.metadata.socketId);
            videoConnected = true;
          }
        });
      });

      socket.on("user-disconnected", (socketId) => {
        removeVideo(socketId);
      });

      if (clientMediaStream.active === true) {
        clientPeer.on("disconnected", () => {   
          socket.disconnect();
        });
      }

      socket.on("find-room-by-socketID", (socketId) => {
        socket.emit("disconnect-user", {socketId, roomCode});
      });

      socket.on("toggle-user-audio", ({socketId, isAudioOpen}) => {
        togglePeerAudio(socketId, !isAudioOpen);
      });

      socket.on("verify-is-muted", (socketId) => {
        socket.emit("is-muted", 
          {
            isMuted: !clientMediaStream.getAudioTracks()[0].enabled, 
            socketId,
            peerSocketId: socket.id
          }
        );
      });

      socket.on("is-muted", ({isMuted, peerSocketId}) => {
        togglePeerAudio(peerSocketId, isMuted);
      });
    }
  }, [clientPeer, clientMediaStream]);

  useEffect(() => {
    if (clientMediaStream && roomCode && clientPeer) {
      clientMediaStream.getAudioTracks()[0].enabled = isAudioOpen;

      socket.emit("toggle-audio", {roomCode, isAudioOpen});

      togglePeerAudio(socket.id, !isAudioOpen);
      
      clientMediaStream.getVideoTracks()[0].enabled = isVideoOpen;
    }
  }, [clientMediaStream, isAudioOpen, isVideoOpen, clientPeer]);
  
  useEffect(() => {
    async function newStream() {
      if (videoChangeSelected.value && clientMediaStream && roomCode) {

        clientMediaStream.getTracks().forEach(track => {
          track.stop();
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {deviceId: videoChangeSelected.value ? {exact: videoChangeSelected.value} : undefined}
        });

        for (let [key] of clientPeer._connections.entries()) {
          clientPeer._connections.get(key)[0].peerConnection.getSenders()[1].replaceTrack(stream.getTracks()[1]);
        }

        addClientMediaStream(stream);
      }
    }
      
    newStream();
  }, [videoChangeSelected]);
  
  useEffect(() => {
    if (clientMediaStream && videoChangeSelected.value && clientMediaStream.active === true && roomCode && socket) {
      const videoContainer = document.getElementById("VIDEO-CONTAINER-" + socket.id);

      if (videoContainer) {
        videoContainer.remove();
        addClientVideo(clientMediaStream, clientUsername, socket.id);
      }
    }
  }, [clientMediaStream, videoChangeSelected, socket]);

  function addPeerVideo(mediaStream, username, socketId) {   
    if (!(document.getElementById("VIDEO-CONTAINER-" + socketId))) {  
      const videoGrid = document.getElementById("video_grid");
      
      const videoContainer = document.createElement("div");
      videoContainer.className = "video_container";
      videoContainer.id = "VIDEO-CONTAINER-" + socketId;
      
      const nameComponent = document.createElement("span");
      nameComponent.innerHTML = username;
      
      const mutedComponent = document.createElement("article");
      mutedComponent.innerHTML = "Mudo";
      mutedComponent.id = "MUTED-COMPONENT-" + socketId;
      
      const video = document.createElement("video");
      video.id = "VIDEO-" + socketId;
      video.muted = false;
      video.srcObject = mediaStream;
      
      video.addEventListener("loadedmetadata", () => {
        video.play();
        mutedComponent.style.display = "none";
        videoContainer.appendChild(mutedComponent);
        videoContainer.appendChild(video);
        videoContainer.appendChild(nameComponent);
        videoGrid.appendChild(videoContainer);
        socket.emit("verify-is-muted", socketId);
      });
    }
  }

  function addClientVideo(mediaStream, username, socketId) {
    if (!(document.getElementById("VIDEO-CONTAINER-" + socketId))) {      
      const videoGrid = document.getElementById("video_grid");
      
      const videoContainer = document.createElement("div");
      videoContainer.className = "video_container";
      videoContainer.id = "VIDEO-CONTAINER-" + socketId;
      
      const nameComponent = document.createElement("span");
      nameComponent.innerHTML = username;

      const mutedComponent = document.createElement("article");
      mutedComponent.innerHTML = "Mudo";
      mutedComponent.id = "MUTED-COMPONENT-" + socketId;
      
      const video = document.createElement("video");
      video.id = "VIDEO-" + socketId;
      video.muted = true;
      video.srcObject = mediaStream;
      
      video.addEventListener("loadedmetadata", () => {
        video.play();
        videoContainer.appendChild(mutedComponent);
        videoContainer.appendChild(video);
        videoContainer.appendChild(nameComponent);
        videoGrid.prepend(videoContainer);
      });
    }
  }

  function removeVideo(socketId) {       
    if (socketId !== null) {  
      const videoContainer = document.getElementById("VIDEO-CONTAINER-" + socketId);
      if (videoContainer) {
        videoContainer.remove();
      }
    } 
  }

  function toggleAudio() {    
    setIsAudioOpen(!isAudioOpen);
  }

  function toggleVideo() {
    setIsVideoOpen(!isVideoOpen);
  }

  function togglePeerAudio(socketId, isMuted) {
    const mutedComponent = document.getElementById("MUTED-COMPONENT-" + socketId);
    if (mutedComponent) {
      if (isMuted) {
        mutedComponent.style.display = "flex";
      } else {
        mutedComponent.style.display = "none";
      }
    }
  }

  async function disconnect() {
    logout();

    clientMediaStream.getTracks().forEach(function(track) {
      track.stop();
    });

    clientPeer.disconnect();
    history.replace("/");
  }
  
  return { 
    disconnect, 
    toggleAudio, 
    toggleVideo, 
    isAudioOpen, 
    isVideoOpen, 
    videoOptions, 
    videoChangeSelected, 
    setVideoChangeSelected
  }
}