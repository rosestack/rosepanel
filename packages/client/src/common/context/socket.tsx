"use client";

import io from "socket.io-client";

import React from "react";

const socket = io();

const SocketContext = React.createContext(socket);

const SocketProvider = (props: React.PropsWithChildren) => {
  return (
    <SocketContext.Provider value={ socket }>
      {props.children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = React.useContext(SocketContext);

  if ( !context ) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};

export {
  SocketContext,
  SocketProvider,
};

export default useSocket;