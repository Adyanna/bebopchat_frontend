import type { Menu_Options } from '@core/types/core-types';
import { Link, NavLink } from "react-router";
import style from './navbar.module.css';

type Props = {
    readonly menuOptions: Menu_Options[];
};

export const Navbar: React.FC<Props> = ({ menuOptions }) => {
    return (
        <nav className={style.navbar}>
            <ul className={style.menu}>
                <div className={style.leftMenu}>
                    {menuOptions.map((option, index) => (
                        <li key={index} className={style.menuItem}>
                            <NavLink
                                to={option.path}
                                className={({ isActive }) =>
                                    `${style.navLink} ${isActive ? style.activeLink : ''}`
                                }
                            >
                                {option.label}
                            </NavLink>
                        </li>
                    ))}
                </div>

                <div className={style.rightMenu}>
                    <li className={style.menuItem}>
                        <Link to="/login" className={style.loginBtn}>
                            Ingresar
                        </Link>
                    </li>
                    <li className={style.menuItem}>
                        <Link to="/signup" className={style.signupBtn}>
                            Registrarse
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
};