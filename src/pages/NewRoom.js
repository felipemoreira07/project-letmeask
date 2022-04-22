import '../styles/auth.scss'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../services/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';

export const NewRoom = () => {
  const [newRoom, setNewRoom] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleCreateNewRoom(event) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return ;
    }

    const  roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id
    })

    navigate(`/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateNewRoom}>
              <input 
              type='text' 
              placeholder="Digite o código da sala"
              onChange= {(event) => {setNewRoom(event.target.value)}}
              value = {newRoom}
              />
              <Button button={{
                type:'submit',
                label:'Entrar na sala'
              }}/>
          </form>
          <p>
              Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
    );
};
