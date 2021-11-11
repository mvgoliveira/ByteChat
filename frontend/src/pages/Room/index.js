import Select from "react-select";
import {FaMicrophoneSlash, FaVideo, FaVideoSlash} from "react-icons/fa"
import {TiMicrophone} from "react-icons/ti"

import { Container } from "./styles";
import { useRoom } from "../../hooks/useRoom";

export function Room({match}) {
  const {params: { roomCode }} = match;
  const {
    disconnect, 
    toggleAudio, 
    toggleVideo, 
    isAudioOpen, 
    isVideoOpen, 
    videoOptions,
    videoChangeSelected,
    setVideoChangeSelected
  } = useRoom(roomCode);

  function handleSelectVideo(value) {
    setVideoChangeSelected(value);
  }

  return (
    <Container>
      <div className="videos_group">
        <div id="video_grid">
          
        </div>
      </div>

      <div className="controllers">
        <button onClick={disconnect}>Desconectar</button>
        
        { isVideoOpen
          ? <button onClick={toggleVideo}><FaVideo/></button>
          : <button onClick={toggleVideo}><FaVideoSlash/></button>
        }
        
        { isAudioOpen
          ? <button onClick={toggleAudio}><TiMicrophone/></button>
          : <button onClick={toggleAudio}><FaMicrophoneSlash/></button>
        }

        <div className="select-container">
          <Select 
            options={videoOptions} 
            value={videoChangeSelected} 
            onChange={handleSelectVideo}
            menuPlacement="top"
          />
        </div>
      </div>
    </Container>
  );
}