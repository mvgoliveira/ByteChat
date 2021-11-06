import { useRoom } from "../../hooks/useRoom";
import { Container } from "./styles";

export function Room({match}) {
  const {params: { roomId }} = match;
  const {} = useRoom(roomId);

  return (
    <Container>
      <div className="videos_group">
        <div id="video_grid">
        </div>
        <button onClick={null}>Desconectar</button>
      </div>

      <div className="controllers">
        <button onClick={null}>Close Video</button>
        <button onClick={null}>Close Audio</button>
      </div>
    </Container>
  );
}