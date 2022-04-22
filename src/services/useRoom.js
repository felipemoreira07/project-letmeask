
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

import { database } from "./firebase";

export const useRoom = (roomId) => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const { user } = useAuth()

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const firebaseQuestions = room.val().questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key,value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likesCount: Object.values(value.likes ?? {}).length,
                    likedId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user.id)?.[0],
                }
            })

            setQuestions(parsedQuestions);
            setTitle(room.val().title);
        })

        return () => {
            roomRef.off('value')
        }

    },[roomId, user.id])

    return { questions, title }
}