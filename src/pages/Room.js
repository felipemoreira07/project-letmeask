import "../styles/room.scss"

import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from "../components/Question"

import { useParams } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../services/useAuth"
import { database } from "../services/firebase"
import { useRoom } from "../services/useRoom"

export const Room = () => {
    const params = useParams();
    const roomId = params.id;
    const { user } = useAuth();
    const [newQuestion, setNewQuestion] = useState()
    const { questions, title } = useRoom(roomId)

    async function sendQuestionHandler(event) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);
    }

    async function handleLikeQuestion(questionId, likeId) {
        if (likeId) {
            await  database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
        } else {
            await  database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId: user.id
            })
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img alt='Let me ask' src="https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/logo.svg"/>
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={sendQuestionHandler}>
                    <textarea placeholder="O que você quer perguntar?"
                    onChange={(event) => {setNewQuestion(event.target.value)}}/>
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>
                        ) : (<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)}
                        <Button button = {{
                            type: 'submit',
                            label: 'Enviar perguntas',
                            disabled: !user
                        }}/>
                    </div>
                </form>
                
                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question 
                            key={question.id}
                            content={question.content} 
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHighlighted}
                            >
                            {!question.isAnswered && 
                            <button 
                            onClick={() => handleLikeQuestion(question.id, question.likedId)} 
                            className={`like-button ${question.likeId ? 'liked' : ''}`} 
                            type="button" 
                            aria-label="Marcar como gostei">
                                  {question.likesCount > 0 && <span>{question.likesCount}</span>}
                                  <img alt="Botão de like" src="https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/like.svg"/>
                            </button>}
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
