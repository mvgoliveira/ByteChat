import Select from "react-select";
import {FaMicrophoneSlash, FaVideo, FaVideoSlash} from "react-icons/fa"
import {TiMicrophone} from "react-icons/ti"

import { Container } from "./styles";
import { useRoom } from "../../hooks/useRoom";

export function Room({match}) {
  const {params: { roomId }} = match;
  const {
    disconnect, 
    toggleMic, 
    toggleVideo, 
    isMicOpen, 
    isVideoOpen, 
    videoOptions,
    videoSelected,
    setVideoSelected
  } = useRoom(roomId);

  function handleSelectVideo(value) {
    setVideoSelected(value);
  }

  return (
    <Container>
      <div className="videos_group">
        <div id="video_grid">
        </div>
        <button onClick={disconnect}>Desconectar</button>
      </div>

      <div className="controllers">
        { isVideoOpen
          ? <button onClick={toggleVideo}><FaVideo/></button>
          : <button onClick={toggleVideo}><FaVideoSlash/></button>
        }
        
        { isMicOpen
          ? <button onClick={toggleMic}><TiMicrophone/></button>
          : <button onClick={toggleMic}><FaMicrophoneSlash/></button>
        }

        <div className="select-container">
          <Select 
            options={videoOptions} 
            maxMenuHeight={100} 
            value={videoSelected} 
            onChange={handleSelectVideo}
          />
        </div>
      </div>
    </Container>
  );
}