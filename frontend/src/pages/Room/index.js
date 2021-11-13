/* eslint-disable react-hooks/exhaustive-deps */
// import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import Select from "react-select";
import {FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash} from "react-icons/fa"
import {TiMicrophone} from "react-icons/ti"
import {MdSettings} from "react-icons/md";

import { Container } from "./styles";
import { useRoom } from "../../hooks/useRoom";
import { useSettings } from "../../hooks/useSettings";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SettingsModal } from "../../Components/Modals";
import { useHistory } from "react-router";

import { RoomSettingsModal } from "../../Components/Modals";
import { api } from "../../services/api";
import { toast } from 'react-toastify';

export function Room({match}) {
  const {params: { room_code }} = match;
  const history = useHistory();

  const [isRoomPrivate, setIsRoomPrivate] = useState(null);
  const [usersAllowed, setUsersAllowed] = useState([]);
  const [userAllowed, setUserAllowed] = useState("");
  const [roomAdminId ,setRoomAdminId] = useState("");

  const [isRoomSettingsModalOpen, setIsRoomSettingsModalOpen] = useState(false);

  const {
    disconnect, 
    toggleAudio, 
    toggleVideo, 
    isAudioOpen, 
    isVideoOpen,
    roomUsersAllowed, 
    setRoomUsersAllowed,
    setVideoChangeSelected,
    videoChangeSelected
  } = useRoom(room_code);

  const {
    clientUsername,
    clientData
  } = useAuth();

  const {
    setRoomCode,
    setIsComplete,
    isSettingsModalOpen,
    handleEnterRoom,
    roomCode,
    error
  } = useSettings();

  useEffect(() => {
    setRoomCode(room_code);
    setIsComplete(false);
    handleSelectVideo("");
    setIsRoomSettingsModalOpen(false);
    setRoomUsersAllowed(null);
  }, []);

  useEffect(() => {
    if (!clientData) {
      toast.error("Login é necessário!");
      history.push('/');
    }
    if (isRoomPrivate && roomUsersAllowed) {
      if (!roomUsersAllowed.find(user => clientData.email === user)) {
        toast.error("Entrada negada!");
        history.push('/');
      }
    }
  }, [roomUsersAllowed, isRoomPrivate, clientData])
  
  useEffect(() => {
    if (roomCode && !clientUsername) {
      handleEnterRoom();
    }
  }, [roomCode, clientUsername]);

  useEffect(() => {
    if (error) {
      history.replace('/');
    }
  }, [error]);

  const {
    videoOptions
  } = useSettings();

  useEffect(() => {
    if (roomUsersAllowed) {
      let allowed = usersAllowed;
      roomUsersAllowed.map(user => {
        allowed = ([...allowed, {label: user, value: user}]);
        return null;
      });
      setUsersAllowed(allowed);
    }
  }, [roomUsersAllowed]);

  useEffect(() => {
    async function getRoomInfos() {
      if (roomCode !== "") {
        const {data} = await api.get(`/rooms/${roomCode}`);
        setIsRoomPrivate(data.private);
        setRoomUsersAllowed(data.usersAllowed);
        setRoomAdminId(data.adminId);
      }
    }
    getRoomInfos();
  }, [roomCode]);

  function handleChange(value) {    
    setUsersAllowed(value);
  };

  function handleInputChange(inputValue) {
    setUserAllowed(inputValue);
  };
  
  function handleKeyDown (event) {
    if (!userAllowed) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setUsersAllowed([...usersAllowed, {label: userAllowed, value: userAllowed}]);
        setUserAllowed("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  function handleSelectVideo(value) {
    setVideoChangeSelected(value);
  }

  function handleConfirm() {
    let allowed = [];

    usersAllowed.map(user => {
      allowed = [...allowed, user.value];
      return null
    });

    api.put(`/room/${room_code}`, {usersAllowed: allowed});

    setIsRoomSettingsModalOpen(false);
  }

  return (
    <Container>
      { clientUsername === "" ? (
        <SettingsModal isOpen={isSettingsModalOpen}/>
      ) : (
        <>
          <RoomSettingsModal isOpen={isRoomSettingsModalOpen} roomCode={room_code}>
            <div id="containerTop">
              <span>Configurações - Sala {isRoomPrivate ? "privada" : "pública"}</span>
            </div>

            <div id="containerMiddle">
              {(isRoomPrivate && roomAdminId === clientData.id) && (
                <>
                  <p>usuários permitidos</p>
                  <div id="UsersSelectContainer">
                    <CreatableSelect
                      components={{DropdownIndicator: null}}
                      inputValue={userAllowed}
                      isClearable
                      isMulti
                      menuIsOpen={false}
                      onChange={handleChange}
                      onInputChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Digite o email e pressione enter..."
                      value={usersAllowed}
                      id="Select-control" 
                    />
                  </div>
                </>
              )}

              <section id="CamSelectContainer">
                <p>câmera</p>
                <Select 
                  options={videoOptions} 
                  value={videoChangeSelected} 
                  onChange={handleSelectVideo}
                  placeholder="Selecione sua câmera"
                />
              </section>
            </div>

            <div id="containerBottom">
              <button type="button" id="cancelButton" onClick={() => setIsRoomSettingsModalOpen(false)}>Cancelar</button>
              <button type="button" onClick={handleConfirm}>Confirmar</button>
            </div>
          </RoomSettingsModal>
          
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

            <button onClick={() => setIsRoomSettingsModalOpen(true)}><MdSettings/></button>

            <button id="disconnect-button" onClick={disconnect}><FaPhoneSlash/></button>
          </div>
        </>
      )}
    </Container>
  );
}