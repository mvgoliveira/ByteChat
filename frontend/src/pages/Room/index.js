import '../Room/style.css';
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsFillMicFill } from 'react-icons/bs'
import { BsFillMicMuteFill } from 'react-icons/bs'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { BsFillCameraVideoOffFill } from 'react-icons/bs'
import { BsFillChatLeftFill } from 'react-icons/bs'
import { FiPhoneOff } from 'react-icons/fi'
import React, {useContext } from 'react';
import { Grid, VideoContainer } from '../../components/RoomGrid';
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
        <Grid/>
      </div>
      
      <div className="down">
        <button className="copybutton">Copiar Link<MdOutlineContentCopy className="button-icon"/></button>
        <button onClick={toggleMic} className="buttons">{appState.mute ? <BsFillMicFill className="button-icon"/> : <BsFillMicMuteFill className="button-icon"/>}</button>
        <button onClick={toggleCam} className="buttons">{appState.cam ? <BsFillCameraVideoFill className="button-icon"/> : <BsFillCameraVideoOffFill className="button-icon"/>}</button>
        <button className="buttons"><BsFillChatLeftFill className="button-icon"/></button>
        <button className="callbutton"><FiPhoneOff className="button-icon"/></button>
        
      </div>
    </body>
  );
}

