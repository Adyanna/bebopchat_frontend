import type { Menu_Options } from '@core/types/core-types';
import './navbar.css';
import { Link, NavLink } from "react-router";

type Props = {
    readonly menuOptions: Menu_Options[];
    readonly isAuthenticated?: boolean | null; // Agrega esta prop para controlar la autenticación
    onLogOut: () => void;
}

export const Navbar: React.FC<Props> = ({ menuOptions, isAuthenticated, onLogOut }) => {

    return (
        <nav>
            <ul className="menu">
                <div className="leftMenu">
                    {
                        menuOptions.map((option, index) => (
                            <li key={index}>
                                <NavLink to={option.path}>{option.label}</NavLink>
                            </li>
                        ))
                    }
                </div>

                <div className="rightMenu">
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li><Link to="/signup">Registrarse</Link></li>
                        </>
                    ) : (
                        <>
                            <button type="button" onClick={onLogOut} className="menuButton" >Logout </button>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    );
}