/* eslint-disable react-hooks/exhaustive-deps */
import Select from "react-select";
import {FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash} from "react-icons/fa"
import {TiMicrophone} from "react-icons/ti"

import { Container } from "./styles";
import { useRoom } from "../../hooks/useRoom";
import { useSettings } from "../../hooks/useSettings";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { SettingsModal } from "../../Components/Modals";

export function Room({match}) {
  const {params: { roomCode }} = match;

  const {
    disconnect, 
    toggleAudio, 
    toggleVideo, 
    isAudioOpen, 
    isVideoOpen, 
    videoChangeSelected, 
    setVideoChangeSelected
  } = useRoom(roomCode);

  const {
    clientUsername
  } = useAuth();

  const {
    setRoomCode,
    openSettingsModal,
    setIsComplete,
    videoOptions
  } = useSettings();

  function handleSelectVideo(value) {
    setVideoChangeSelected(value);
  }

  useEffect(() => {
    setIsComplete(false);
  }, [])

  useEffect(() => {
    if (!clientUsername) {
      setRoomCode(roomCode);
      openSettingsModal();
    }
  }, [clientUsername]);

  return (
    <Container>
      { clientUsername === "" ? (
        <SettingsModal isOpen={true}>
        </SettingsModal>
      ) : (
        <>
          <div className="videos_group">
            <div id="video_grid">
              
            </div>
          </div>

          <div className="controllers">           
            { isVideoOpen
              ? <button onClick={toggleVideo}><FaVideo/></button>
              : <button onClick={toggleVideo}><FaVideoSlash/></button>
            }
            
            { isAudioOpen
              ? <button onClick={toggleAudio}><TiMicrophone/></button>
              : <button onClick={toggleAudio}><FaMicrophoneSlash/></button>
            }

            <button id="disconnect-button" onClick={disconnect}><FaPhoneSlash/></button>

            <div className="select-container">
              <Select 
                options={videoOptions} 
                value={videoChangeSelected} 
                onChange={handleSelectVideo}
                menuPlacement="top"
              />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}