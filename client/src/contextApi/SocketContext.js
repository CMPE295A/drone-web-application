import { createContext } from "react";
import io from 'socket.io-client';
import { backendUrl } from "../config";


//Use context API to share a single Socket.IO connection 
//create new context object for WebSocket
export const SocketContext = createContext();

//create the component that provides the shared state to its children components via the Context API
export const SocketProvider = ({ children }) => {
    const socket = io(backendUrl); //share io connection
    // console.log(socket);

    //pass the socket value to all its descendants in the component tree
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

