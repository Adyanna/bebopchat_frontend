import './App.css'
import { Outlet } from 'react-router';
import { Layout } from '@core/components/layout/layout';
import type { Menu_Options } from '@core/types/core-types'
import { useState } from 'react';

const MenuOptions: Menu_Options[] = [
  { label: "Home", path: "/home" },
  { label: "Perfil", path: "/profile" },
  { label: "Mensajes", path: "/Mensajes" }
]

const srclogo = "../src/assets/logo_2.jpg";


function App() {
  const token = localStorage.getItem("token") || sessionStorage.getItem('token')
  console.log("TOKEN DESDE APP: ", token);
  const [isautenticate, setIsAutenticate] = useState(!!token);

  return (
    <>
      <Layout
        title="BOBAPCHAT"
        subTittle="Welcome to my universe"
        menuOptions={MenuOptions}
        srcl={srclogo}
        isAuth={isautenticate}
        setIsAuth={setIsAutenticate}
      >
        <Outlet />
      </Layout>
    </>
  )
}

export default App
