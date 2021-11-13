/* eslint-disable react-hooks/exhaustive-deps */
// import Select from "react-select";
import {FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash} from "react-icons/fa"
import {TiMicrophone} from "react-icons/ti"

import { Container } from "./styles";
import { useRoom } from "../../hooks/useRoom";
import { useSettings } from "../../hooks/useSettings";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { SettingsModal } from "../../Components/Modals";
import { useHistory } from "react-router";

export function Room({match}) {
  const {params: { room_code }} = match;
  const history = useHistory();

  const {
    disconnect, 
    toggleAudio, 
    toggleVideo, 
    isAudioOpen, 
    isVideoOpen, 
    // videoChangeSelected, 
    // setVideoChangeSelected
  } = useRoom(room_code);

  const {
    clientUsername
  } = useAuth();

  const {
    setRoomCode,
    setIsComplete,
    isSettingsModalOpen,
    handleEnterRoom,
    roomCode,
    error
    // videoOptions
  } = useSettings();

  // function handleSelectVideo(value) {
  //   setVideoChangeSelected(value);
  // }

  useEffect(() => {
    setRoomCode(room_code);
    setIsComplete(false);
  }, []);
  
  useEffect(() => {
    if (roomCode && !clientUsername) {
      handleEnterRoom();
    }
  }, [roomCode, clientUsername]);

  useEffect(() => {
    if (error) {
      history.replace('/');
    }
  }, [error])

  return (
    <Container>
      { clientUsername === "" ? (
        <SettingsModal isOpen={isSettingsModalOpen}>
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
          </div>
        </>
      )}
    </Container>
  );
}

{/* <div className="select-container">
  <Select 
    options={videoOptions} 
    value={videoChangeSelected} 
    onChange={handleSelectVideo}
    menuPlacement="top"
  />
</div> */}