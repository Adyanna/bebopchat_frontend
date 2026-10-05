import { useState } from 'react';
import { NavLink } from 'react-router';
import type { Menu_Options } from '@core/types/core-types';
import { Logo } from '@core/components/logo/logo';
import { BrandHeader } from '@core/components/brand/brandHeader';
import style from './sidebar.module.css';

type SidebarProps = {
    readonly title: string;
    readonly subTittle: string;
    readonly srclogo: string;
    readonly menuOptions: Menu_Options[];
    readonly onLogOut: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
    title,
    subTittle,
    srclogo,
    menuOptions,
    onLogOut
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside className={`${style.sidebar} ${isCollapsed ? style.collapsed : ''}`}>
            {/* Cabecera del Sidebar */}
            <div className={style.sidebarHeader}>
                <Logo srclogo={srclogo} />
                {!isCollapsed && <BrandHeader title={title} subTittle={subTittle} />}
                <button
                    type="button"
                    className={style.toggleBtn}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    aria-label="Contraer/Expandir menú"
                >
                    {isCollapsed ? '▶' : '◀'}
                </button>
            </div>

            {/* Menú de Opciones Privadas */}
            <nav className={style.sidebarNav}>
                {menuOptions.map((option, index) => (
                    <NavLink
                        key={index}
                        to={option.path}
                        className={({ isActive }) =>
                            `${style.navItem} ${isActive ? style.activeLink : ''}`
                        }
                    >
                        <span className={style.navBullet}>▪</span>
                        {!isCollapsed && <span>{option.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Pie de Sidebar / Salir */}
            <div className={style.sidebarFooter}>
                <button type="button" onClick={onLogOut} className={style.logoutBtn}>
                    <span className={style.navBullet}>⎋</span>
                    {!isCollapsed && <span>Salir</span>}
                </button>
            </div>
        </aside>
    );
};