import type { ReactNode } from 'react';
import type { Menu_Options } from '@core/types/core-types';
import { useNavigate } from 'react-router';

import { BrandHeader } from '@core/components/brand/brandHeader';
import { Navbar } from '@core/components/navbar/navbar';
import { Sidebar } from '@core/components/sidebar/Sidebar';
import { Logo } from '@core/components/logo/logo';
import { Footer } from '@core/components/footer/footer';
import style from './layout.module.css';

type Props = {
    readonly title: string;
    readonly subTittle: string;
    readonly menuOptions: Menu_Options[];
    readonly children: ReactNode;
    readonly srcl: string;
    readonly isAuth: boolean | null;
    readonly setIsAuth: (value: boolean) => void;
};

export const Layout: React.FC<Props> = ({
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
        sessionStorage.removeItem('token');
        navigate('/home');
    };

    if (isAuth) {
        return (
            <div className={style.appContainer}>
                <Sidebar
                    title={title}
                    subTittle={subTittle}
                    srclogo={srcl}
                    menuOptions={menuOptions}
                    onLogOut={handleLogOut}
                />
                <main className={style.appMainContent}>
                    {children}
                </main>
            </div>
        );
    }

    return (
        <div className={style.publicContainer}>
            <header className={style.publicHeader}>
                <div className={style.brandGroup}>
                    <Logo srclogo={srcl} />
                    <BrandHeader title={title} subTittle={subTittle} />
                </div>
                <Navbar menuOptions={menuOptions} />
            </header>

            <main className={style.publicMainContent}>
                {children}
            </main>

            <Footer Menu_Options={menuOptions} />
        </div>
    );
};