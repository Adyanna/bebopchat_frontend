import './App.css';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Layout } from '@core/components/layout/layout';
import type { Menu_Options } from '@core/types/core-types';
import { useState, useEffect } from 'react';

const PublicMenuOptions: Menu_Options[] = [
  { label: "Inicio", path: "/home" },
  { label: "Servicios", path: "/services" },
  { label: "Nosotros", path: "/about" }
];

const PrivateMenuOptions: Menu_Options[] = [
  { label: "Perfil", path: "/profile" },
  { label: "Mensajes", path: "/message" },
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
      const privatePaths = ['/profile', '/message', '/status', '/calls', '/games'];
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