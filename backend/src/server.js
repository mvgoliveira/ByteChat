import {http} from './http';
import "./websocket/VideoChat";

http.listen(3333, () => {
  console.log('listening on 3333');
});