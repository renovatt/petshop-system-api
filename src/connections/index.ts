import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
}

export const verifyUserId = (userId: string) => {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return !idRegex.test(userId)
}

export const verifyEmail = (email: string) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}

export const verifyValidPassword = (password: string) => {
    const errors = [];

    if (password.length < 6) errors.push("A senha precisa ter pelo menos 6 caracteres.");
    if (!/[A-Z]/.test(password)) errors.push("A senha precisa ter pelo menos uma letra maiúscula.");
    if (!/[\W_]/.test(password)) errors.push("A senha precisa ter pelo menos um caractere especial.");
    if (!/^(?=.*[0-9])/.test(password)) errors.push("A senha precisa ter pelo menos um número.");

    return errors;
};


