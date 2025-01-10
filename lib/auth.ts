import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

type Session = {
    userId: string;
    email: string;
};

export async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies(); // Получаем cookies
    const token = cookieStore.get('token')?.value; // Получаем значение токена

    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as Session; // Расшифровываем токен
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}

export async function createSession(userId: string, email: string): Promise<string> {
    const token = jwt.sign({ userId, email }, SECRET_KEY, { expiresIn: '1h' }); // Создаем токен
    return token;
}