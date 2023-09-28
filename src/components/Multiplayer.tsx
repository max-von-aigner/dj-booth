import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

type MultiplayerProps = {
  // Any props you need to pass
};

const Multiplayer: React.FC<MultiplayerProps> = (props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // adjust the URL as necessary
    setSocket(newSocket);

    newSocket.on("message", (message) => {
      // Handle incoming messages
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    socket?.emit("message", message);
  };

  return (
    <div>
      {/* Render your multiplayer UI here. Pass down any necessary data or functions. */}
    </div>
  );
};

export default Multiplayer;
