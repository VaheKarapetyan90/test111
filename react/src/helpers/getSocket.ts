import { io, Socket } from "socket.io-client";

let socket: Socket | any;
export const getSocket = (token: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_APP_BASE_URL_SOCKET, {
      auth: { token },
      withCredentials: true,
    });
  } else if (!socket.auth.token && token) {
    socket = io(import.meta.env.VITE_APP_BASE_URL_SOCKET, {
      auth: { token },
      withCredentials: true,
    });
  }
  return socket;
};
