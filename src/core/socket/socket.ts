import { io } from 'socket.io-client';

const url = `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}`;

export const socket = io(url, {
  autoConnect: false,
});

export const connectSocket = () => {
  const token =
    localStorage.getItem('token') ||
    sessionStorage.getItem('token');

  socket.auth = {
    token: token?.replace('Bearer ', ''),
  };

  socket.connect();
};