import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_IPAddress+":3001");

export default socket;