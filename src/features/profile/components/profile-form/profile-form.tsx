import { useState, useEffect } from "react"
import type { Perfil, ProfileUpdateDTO } from "@features/profile/entities/profile.entity"
import styles from "./profile-form.module.css"

interface ProfileFormProps {
    initialData?: Perfil;
    onSave: (data: ProfileUpdateDTO) => Promise<void>;
}

export const ProfileForm = ({ initialData, onSave }: ProfileFormProps) => {
    // Estado local para los campos del formulario
    const [formData, setFormData] = useState<ProfileUpdateDTO>({
        photoUrl: initialData?.photoUrl ?? "",
        estadoCivil: initialData?.estadoCivil ?? -2,
        genero: initialData?.genero ?? -2,
        estadoAnimo: initialData?.estadoAnimo ?? -2,
        descripcion: initialData?.descripcion ?? ""
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Sincronizar el estado si initialData cambia (por ejemplo, tras cargar la API)
    useEffect(() => {
        if (initialData) {
            setFormData({
                photoUrl: initialData.photoUrl ?? "",
                estadoCivil: initialData.estadoCivil ?? -2,
                genero: initialData.genero ?? -2,
                estadoAnimo: initialData.estadoAnimo ?? -2,
                descripcion: initialData.descripcion ?? ""
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "descripcion" || name === "photoUrl" ? value : Number(value)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await onSave(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formCard}>
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>[ EXPEDIENTE Y DATOS DE REGISTRO ]</h2>
            </div>

            <div className={styles.grid}>
                {/* Frecuencia Emocional / Estado de Ánimo */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="estadoAnimo" className={styles.label}>
                        FRECUENCIA EMOCIONAL (ESTADO DE ÁNIMO)
                    </label>
                    <select
                        id="estadoAnimo"
                        name="estadoAnimo"
                        value={formData.estadoAnimo}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value={-2}>Viendo las estrellas...</option>
                        <option value={1}>En cacería de recompensa</option>
                        <option value={2}>Cocinando pimiento sin carne</option>
                        <option value={3}>Buscando lana (wool)</option>
                        <option value={4}>Hackeando la red</option>
                    </select>
                </div>

                {/* Estatus de Tripulación / Estado Civil */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="estadoCivil" className={styles.label}>
                        ESTATUS DE TRIPULACIÓN (ESTADO CIVIL)
                    </label>
                    <select
                        id="estadoCivil"
                        name="estadoCivil"
                        value={formData.estadoCivil}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value={-2}>Sin clasificar</option>
                        <option value={1}>Lobo Solitario (Soltero/a)</option>
                        <option value={2}>Co-piloto Asignado (En pareja)</option>
                        <option value={3}>Perdido en el Pasado (Complicado)</option>
                    </select>
                </div>

                {/* Registro de Género */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="genero" className={styles.label}>
                        REGISTRO DE GÉNERO
                    </label>
                    <select
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value={-2}>No especificado</option>
                        <option value={1}>Masculino</option>
                        <option value={2}>Femenino</option>
                    </select>
                </div>

                {/* URL Foto de Perfil */}
                <div className={styles.fieldGroup}>
                    <label htmlFor="photoUrl" className={styles.label}>
                        URL FOTO DE PERFIL
                    </label>
                    <input
                        type="text"
                        id="photoUrl"
                        name="photoUrl"
                        value={formData.photoUrl}
                        onChange={handleChange}
                        placeholder="/assets/photo.jpg"
                        className={styles.input}
                    />
                </div>

                {/* Biografía / Descripción */}
                <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
                    <label htmlFor="descripcion" className={styles.label}>
                        EXPEDIENTE / BIOGRAFÍA PERSONAL
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Escribe tus gustos o notas sobre tu historial..."
                        className={styles.textarea}
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                >
                    {isSubmitting ? "REGISTRANDO..." : "GUARDAR CAMBIOS"}
                </button>
            </div>
        </form>
    );
};