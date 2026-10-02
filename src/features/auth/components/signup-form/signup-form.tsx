import styles from './signup-form.module.css';
import React, { useState } from 'react';
import type { userCreateDTO } from '@features/auth/entities/auth.entity';

interface Props {
    onCreate: (user: userCreateDTO) => void;
}

type SignupFormData = userCreateDTO & {
    countryCode: string;
    confirmPassword: string;
};

export const SignupForm = ({ onCreate }: Props) => {

    const [user, setUser] = useState<SignupFormData>({
        phone: "",
        fullname: "",
        password: "",
        countryCode: "591",
        confirmPassword: ""
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (user.password !== user.confirmPassword) { return; }
        const userData: userCreateDTO = {
            phone: `${user.countryCode}${user.phone}`,
            fullname: user.fullname,
            password: user.password
        };
        onCreate(userData);
    }

    return (
        <section className={styles.container}>
            <form
                className={styles.form}
                onSubmit={onSubmit}
            >
                <h2 className={styles.title}>
                    Crear Cuenta
                </h2>

                <label className={styles.controlGroup}>
                    <span>Teléfono</span>

                    <div className={styles.phoneGroup}>
                        <select
                            className={styles.countryCode}
                            name="countryCode"
                            value={user.countryCode}
                            onChange={onChange}
                        >
                            <option value="591">+591</option>
                            <option value="54">+54</option>
                            <option value="55">+55</option>
                            <option value="56">+56</option>
                            <option value="57">+57</option>
                            <option value="51">+51</option>
                            <option value="52">+52</option>
                        </select>

                        <input
                            className={styles.phoneInput}
                            type="tel"
                            name="phone"
                            value={user.phone}
                            onChange={onChange}
                            placeholder="71234567"
                        />
                    </div>
                </label>

                <label className={styles.controlGroup}>
                    <span>Nombre completo</span>
                    <input
                        type="text"
                        name="fullname"
                        value={user.fullname}
                        onChange={onChange}
                    />
                </label>

                <label className={styles.controlGroup}>
                    <span>Contraseña</span>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                    />
                </label>

                <label className={styles.controlGroup}>
                    <span>Confirmar contraseña</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={onChange}
                    />
                </label>

                <button
                    type="submit"
                    className={styles.submitButton}
                >
                    Registrarse
                </button>
            </form>
        </section>
    );
}