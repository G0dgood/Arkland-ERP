import { createContext } from "react";
import { io } from "socket.io-client";
const SocketContext: any = createContext(undefined);
const SocketProvider = ({ children, setMessages }: any) => {
  const socket: any = io("https://arkland-erp-b4872258abbf.herokuapp.com");

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };




