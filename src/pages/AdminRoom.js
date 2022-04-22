import "../styles/room.scss"

import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from "../components/Question"

import { useParams, useNavigate } from "react-router-dom"
import { useRoom } from "../services/useRoom"
import { database } from "../services/firebase"
import React from "react"

export const AdminRoom = () => {
    const params = useParams();
    const navigate = useNavigate()
    const roomId = params.id;
    const { questions, title } = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })

        navigate('/');
    }

    async function handleDeleteQuestion(questionId) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestion(questionId) {        
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img alt='Let me ask' src="https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/logo.svg"/>
                    <div>
                      <RoomCode code={roomId}/>
                      <Button className2='outlined' button = {{
                          label: 'Encerrar sala',
                          type: 'button',
                          onClick: handleEndRoom
                        }}/>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                
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
                                {!question.isAnswered && (
                                    <React.Fragment>
                                       <button type="button" onClick={() => handleCheckQuestion(question.id)}>
                                         <img alt="botão de deletar pergunta" src="https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/check.svg"/>
                                       </button> 
                                       <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                         <img alt="botão de deletar pergunta" src="https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/answer.svg"/>
                                       </button>
                                    </React.Fragment>
                                )}
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img alt="botão de deletar pergunta" src="https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/delete.svg"/>
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}