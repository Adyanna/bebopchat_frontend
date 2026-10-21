import './App.css';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Layout } from '@core/components/layout/layout';
import type { Menu_Options } from '@core/types/core-types';
import { useState, useEffect } from 'react';
import { socket, connectSocket } from '@core/socket/socket';



const PublicMenuOptions: Menu_Options[] = [
  { label: "Inicio", path: "/home" },
  { label: "Servicios", path: "/services" },
  { label: "Nosotros", path: "/about" }
];

const PrivateMenuOptions: Menu_Options[] = [
  { label: "Perfil", path: "/profile" },
  { label: "Contactos", path: "/contacts" },
  { label: "Mensajes", path: "/chats" },
  { label: "Estados", path: "/status" },
  { label: "Llamadas", path: "/calls" },
  { label: "Juegos", path: "/games" }
];

const srclogo = "../src/assets/logo_2.jpg";

function App() {
  const token = localStorage.getItem("token") || sessionStorage.getItem('token');
  const [isautenticate, setIsAutenticate] = useState<boolean>(!!token);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si NO está autenticado e intenta acceder a la raíz o a una ruta privada
    if (!isautenticate) {
      const privatePaths = ['/profile', '/chats', '/status', '/calls', '/games'];
      if (location.pathname === '/' || privatePaths.includes(location.pathname)) {
        navigate('/home', { replace: true });
      }
    }
    // Si SÍ está autenticado e intenta acceder a la raíz o a /home
    else if (isautenticate) {
      if (location.pathname === '/' || location.pathname === '/home') {
        navigate('/profile', { replace: true });
      }
    }
  }, [isautenticate, location.pathname, navigate]);


  // Socket.IO
  useEffect(() => {
    connectSocket();

    const handleConnect = () => {
      console.log('Socket conectado:', socket.id);
    };

    const handleConnectError = (error: Error) => {
      console.error('Error de conexión Socket.IO:', error.message);
    };

    const handleReceiveMessage = (message: unknown) => {
      console.log('Mensaje recibido por Socket.IO:', message);
    };

    socket.on('connect', handleConnect);
    socket.on('connect_error', handleConnectError);
    socket.on('receive_message', handleReceiveMessage);

    socket.on('socket_error', (data: { message: string }) => {
      console.error('Error de Socket.IO:', data.message);
    });

    socket.on('joined_conversation', (data: {
      chatId: number;
      message: string;
    }) => {
      console.log('✅ Entrada exitosa:', data.message);
      console.log('Chat ID:', data.chatId);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('connect_error', handleConnectError);
      socket.off('receive_message', handleReceiveMessage);
      socket.off('socket_error');
      socket.disconnect();
    };
  }, []);

  const menuOptions = isautenticate ? PrivateMenuOptions : PublicMenuOptions;

  return (
    <Layout
      title="BEBOPCHAT"
      subTittle="Welcome to my App"
      menuOptions={menuOptions}
      srcl={srclogo}
      isAuth={isautenticate}
      setIsAuth={setIsAutenticate}
    >
      <Outlet />
    </Layout>
  );
}

export default App;