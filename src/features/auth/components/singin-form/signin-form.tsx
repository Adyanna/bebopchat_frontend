import { useState } from "react";
import style from './signin-form.module.css';

interface Props {
    onLogin: (phone: string, password: string, remember: boolean) => void;
    error?: string;
}

export const SigninForm = ({ onLogin, error }: Props) => {
    const [countryCode, setCountryCode] = useState("591");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(`${countryCode}${phone}`, password, remember);
    };

    return (
        <div className={style.loginContainer}>
            <form className={style.loginForm} onSubmit={handleSubmit}>
                <h2 className={style.title}>Login</h2>
                {error && (<p className={style.error}>{error}</p>)}

                <select
                    className={style.input}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                >
                    <option value="591">+591</option>
                    <option value="54">+54</option>
                    <option value="55">+55</option>
                    <option value="56">+56</option>
                    <option value="57">+57</option>
                    <option value="51">+51</option>
                    <option value="52">+52</option>
                </select>
                <input className={style.input}
                    type="tel"
                    placeholder="76543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input className={style.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label className={style.checkbox}>
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    Recordar sesión
                </label>

                <button className={style.button} type="submit">Entrar</button>
            </form>
        </div>
    );
};