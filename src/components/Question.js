import '../styles/question.scss'

export const Question = (props) => {
    return (
        <div className={`question ${props.isAnswered?'answered':''} 
          ${props.isHighlighted && !props.isAnswered?'highlighted':''}`}>
            <p>{props.content}</p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name}/>
                    <span>{props.author.name}</span>
                </div>
                <div>{props.children}</div>
            </footer>
        </div>
    );
};