import 'pages/styles.css';
import Call from "illustrations/Call.svg";
import Mic from "illustrations/Mic.svg";
import Mic_off from "illustrations/Mic_off.svg";
import Videocam from "illustrations/Videocam.svg";
import Videocam_off from "illustrations/Videocam_off.svg";
import Copy from "illustrations/Copy.svg";
import Chat from "illustrations/Chatbox.svg";
import React, {useContext } from 'react';
import { AppStateContext } from 'components/AppState.js'
import Global_header from 'styles/globalheader';

function Videochat_page() {
  const appState = useContext(AppStateContext);
  
  function toggleMic() {
      appState.setMute(!appState.mute);
  }

  function toggleCam() {
      appState.setVisible(!appState.cam);
  }

  return (
    <body>
      <Global_header/>
      <div className="videochat_page">
        <div>
          <p className="card"></p>
        </div>
      </div>
      <div className="footer">
        <p className="copybutton">Copiar Link<img className="imgcopy" src={Copy}></img></p>
        <img className="micbutton" src={appState.mute ? Mic_off : Mic} onClick={toggleMic}></img>
        <img className="iconbutton" src={appState.cam ? Videocam_off : Videocam} onClick={toggleCam}></img>
        <img className="iconbutton" src={Chat}></img>
        <img className="callbutton" src={Call}></img>
      </div>

      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </body>
  );
}

export default Videochat_page;
