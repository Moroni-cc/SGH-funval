const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export function isValidEmail(email = "") {
    return EMAIL_REGEX.test(email.trim());
}

export function isValidPassword(password = "") {
    return typeof password === "string" && password.length >= MIN_PASSWORD_LENGTH;
}

export function validateLoginForm({ email, password }) {
    const errors = {};

    if (!email?.trim()) {
        errors.email = "El correo es obligatorio.";
    } else if (!isValidEmail(email)) {
        errors.email = "Ingresa un correo electrónico válido.";
    }

    if (!password) {
        errors.password = "La contraseña es obligatoria.";
    } else if (!isValidPassword(password)) {
        errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`;
    }

    return errors;
}
