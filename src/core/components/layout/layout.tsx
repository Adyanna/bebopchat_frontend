import type { ReactNode } from 'react';
import type { Menu_Options } from '@core/types/core-types';

import { BrandHeader } from '@core/components/brand/brandHeader';
import { Navbar } from '@core/components/navbar/navbar';
import { Logo } from '@core/components/logo/logo';
import { Footer } from '@core/components/footer/footer';
import style from './layout.module.css';
import { useNavigate } from 'react-router';

//VARIABLES QUE SE RESIBIRAN EN EL COMPONENTE
type props = {
    readonly title: string;
    readonly subTittle: string;
    readonly menuOptions: Menu_Options[];
    readonly children: ReactNode;
    readonly srcl: string;
    readonly isAuth: boolean | null;
    readonly setIsAuth: (value: boolean) => void;
}

export const Layout: React.FC<props> = ({
    title,
    subTittle,
    menuOptions,
    children,
    srcl,
    isAuth,
    setIsAuth
}) => {
    const navigate = useNavigate();



    const handleLogOut = () => {

        setIsAuth(false);
        localStorage.removeItem('token');
        navigate('/home');
    }

    return (
        <>
            <header className={style.header}>
                <Logo srclogo={srcl} />
                <BrandHeader title={title} subTittle={subTittle} />
                <Navbar menuOptions={menuOptions} isAuthenticated={isAuth} onLogOut={handleLogOut} />
            </header>
            <main>
                {children}
            </main>
            <Footer Menu_Options={menuOptions} />
        </>
    );
}