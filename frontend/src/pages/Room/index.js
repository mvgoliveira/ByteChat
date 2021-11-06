import { useRoom } from "../../hooks/useRoom";
import { Container } from "./styles";

export function Room({match}) {
  const {params: { roomId }} = match;
  const {disconnect, toggleMic, toggleVideo} = useRoom(roomId);

  return (
    <Container>
      <div className="videos_group">
        <div id="video_grid">
        </div>
        <button onClick={disconnect}>Desconectar</button>
      </div>

      <div className="controllers">
        <button onClick={toggleVideo}>Close Video</button>
        <button onClick={toggleMic}>Close Audio</button>
      </div>
    </Container>
  );
}