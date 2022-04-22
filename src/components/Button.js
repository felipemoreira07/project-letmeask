import '../styles/button.scss'

export const Button = (props) => {
    return (
        <button className={`button ${props.className2}`} {...props.button}>
            {props.button.label}
        </button>
    );   
};