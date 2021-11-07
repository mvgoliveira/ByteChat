/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Peer from "peerjs";

import { createSocket } from "../services/socket";
import { useAuth } from "./useAuth";

export function useRoom(roomId) {
  const [socket, setSocket] = useState(null);
  const history = useHistory();

  const [isMicOpen, setIsMicOpen] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(true);

  const [videoOptions, setVideoOptions] = useState([{}]);
  const [videoSelected, setVideoSelected] = useState({});
  
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
  }, [])

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

        addClientVideo(stream, clientUsername, socket.id);
        addClientMediaStream(stream);
      } 
    }
    startClientVideo();
  }, [clientUsername, socket]);

  useEffect(() => {
    if (clientMediaStream !== null && socket !== null && !videoSelected.value) {
      const peer = new Peer({
        host: "localhost",
        port: 3333,
        path: "/peerjs"
      });

      peer.on("open", (peerId) => {  
        socket.emit("join-room", {peerId, roomId, username: clientUsername});
      });

      addClientPeer(peer);
    }
  }, [clientMediaStream, socket]);

  useEffect(() => {
    if (clientPeer && clientMediaStream !== null) {      
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
        socket.emit("disconnect-user", {socketId, roomId});
      });
    }
  }, [clientPeer, clientMediaStream]);

  useEffect(() => {
    if (clientMediaStream) {
      clientMediaStream.getAudioTracks()[0].enabled = isMicOpen;
      clientMediaStream.getVideoTracks()[0].enabled = isVideoOpen;
    }
  }, [clientMediaStream, isMicOpen, isVideoOpen]);
  
  useEffect(() => {
    async function newStream() {
      if (videoSelected.value) {

        clientMediaStream.getTracks().forEach(track => {
          track.stop();
        });

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {deviceId: videoSelected.value ? {exact: videoSelected.value} : undefined}
        });

        for (let [key] of clientPeer._connections.entries()) {
          clientPeer._connections.get(key)[0].peerConnection.getSenders()[1].replaceTrack(stream.getTracks()[1]);
        }

        addClientMediaStream(stream);
      }
    }
      
    newStream();
  }, [videoSelected]);
  
  useEffect(() => {
    if (clientMediaStream !== null && videoSelected.value && clientMediaStream.active === true) {
      const videoContainer = document.getElementById("VIDEO-CONTAINER-" + socket.id);

      if (videoContainer) {
        videoContainer.remove();
        addClientVideo(clientMediaStream, clientUsername, socket.id);
      }
    }
  }, [clientMediaStream, videoSelected]);

  function addPeerVideo(mediaStream, username, socketId) {   
    if (!(document.getElementById("VIDEO-CONTAINER-" + socketId))) {      
      const videoGrid = document.getElementById("video_grid");
      const videoContainer = document.createElement("div");
      const nameComponent = document.createElement("span");
      const video = document.createElement("video");
      
      video.id = "VIDEO-" + socketId;
      nameComponent.innerHTML = username;
      
      videoContainer.className = "video_container";
      videoContainer.id = "VIDEO-CONTAINER-" + socketId;
      
      video.muted = false;
      video.srcObject = mediaStream;

      video.addEventListener("loadedmetadata", () => {
        video.play();
        videoContainer.appendChild(video);
        videoContainer.appendChild(nameComponent);
        videoGrid.appendChild(videoContainer);
      })
    }
  }

  function addClientVideo(mediaStream, username, socketId) {
    if (!(document.getElementById("VIDEO-CONTAINER-" + socketId))) {      
      const videoGrid = document.getElementById("video_grid");
      const videoContainer = document.createElement("div");
      const nameComponent = document.createElement("span");
      const video = document.createElement("video");
      
      video.id = "VIDEO-" + socketId;
      nameComponent.innerHTML = username;
      
      videoContainer.className = "video_container";
      videoContainer.id = "VIDEO-CONTAINER-" + socketId;
      
      video.muted = true;
      video.srcObject = mediaStream;

      video.addEventListener("loadedmetadata", () => {
        video.play();
        videoContainer.appendChild(video);
        videoContainer.appendChild(nameComponent);
        videoGrid.prepend(videoContainer);
      })
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

  function toggleMic() {    
    setIsMicOpen(!isMicOpen);
  }

  function toggleVideo() {
    setIsVideoOpen(!isVideoOpen);
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
    toggleMic, 
    toggleVideo, 
    isMicOpen, 
    isVideoOpen, 
    videoOptions, 
    videoSelected, 
    setVideoSelected
  }
}