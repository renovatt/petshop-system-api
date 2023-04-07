import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function verifyUserId(userId: string) {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return !idRegex.test(userId)
}