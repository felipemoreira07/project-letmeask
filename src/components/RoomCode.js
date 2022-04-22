import "../styles/room-code.scss"

export const RoomCode = (props) => {
    function copyRoomCode() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomCode}>
            <div>
                <img src='https://raw.githubusercontent.com/guilhermeassuncao/letmeask/134afff6c0696e336e64244eb4726d3dda739465/src/assets/images/copy.svg'
                 alt='Copy room code'/>
            </div>
            <span>Sala #{props.code}</span>
        </button>
    );
};