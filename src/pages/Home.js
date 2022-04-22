import '../styles/auth.scss'

import { useAuth } from '../services/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Button } from '../components/Button';

import { database } from '../services/firebase';

export const Home = () => {
    const navigate = useNavigate()
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');
  
    async function newRoomHandler() {
      if (!user) {
        await signInWithGoogle();
      }

      navigate('/rooms/new')  
    }

    async function joinRoomHandler(event) {
      event.preventDefault();

      if(roomCode.trim() === '') {
        return;
      }

      const roomRef = await database.ref(`rooms/${roomCode}`).get();

      if(!roomRef.exists()) {
        alert('Room does not exist.');
        return;
      }

      if(roomRef.val().closedAt) {
        alert('Room already closed');
        return;
      }

      navigate(`/rooms/${roomCode}`)
    }

    return (
    <div id='page-auth'>
      <aside>
        <img src='https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/illustration.svg'
          alt='imagem simbolizando perguntas e respostas'/>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src='https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/logo.svg'
            alt='Let me Ask'/>
          <button className='create-room' onClick={newRoomHandler}>
            <img src='https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/google-icon.svg'
              alt='Logo da Google'/>
            Crie sua sala com Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
              <input 
              type='text' 
              placeholder="Digite o código da sala"
              onChange={(event) => {setRoomCode(event.target.value)}}
              value={roomCode}
              />
              <Button button={{
                onClick: joinRoomHandler,
                type:'submit',
                label:'Entrar na sala'
              }}/>
          </form>
        </div>
      </main>
    </div>
    );
};
