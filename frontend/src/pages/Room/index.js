import '../Room/style.css';
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsFillMicFill } from 'react-icons/bs'
import { BsFillMicMuteFill } from 'react-icons/bs'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { BsFillCameraVideoOffFill } from 'react-icons/bs'
import { BsFillChatLeftFill } from 'react-icons/bs'
import { FiPhoneOff } from 'react-icons/fi'
import React, {useContext } from 'react';
import { AppStateContext } from '../../contexts/AppState'

export function Room() {
  const appState = useContext(AppStateContext);
  
  function toggleMic() {
      appState.setMute(!appState.mute);
  }

  function toggleCam() {
      appState.setVisible(!appState.cam);
  }

  return (
    <body className="body">
      <div className="up">
        <div>
          <p className="card"></p>
        </div>
      </div>
      <div className="down">
        <p className="copybutton">Copiar Link<MdOutlineContentCopy className="iconcopy"/></p>
        <p onClick={toggleMic}>{appState.mute ? <BsFillMicFill className="buttons"/> : <BsFillMicMuteFill className="buttons"/>}</p>
        <p onClick={toggleCam}>{appState.cam ? <BsFillCameraVideoFill className="buttons"/> : <BsFillCameraVideoOffFill className="buttons"/>}</p>
        <BsFillChatLeftFill className="buttons"/>
        <FiPhoneOff className="callbutton"/>
      </div>

      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </body>
  );
}

