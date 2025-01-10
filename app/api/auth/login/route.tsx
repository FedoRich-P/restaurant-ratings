// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { readUsers, comparePassword } from '@/lib/users';
import { createSession } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Ищем пользователя по email
        const users = readUsers();
        const user = users.find((user) => user.email === email);

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        // Проверяем пароль
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: 'Invalid email or password' },
                { status: 400 }
            );
        }

        // Создаем сессию и возвращаем токен
        const token = await createSession(user.id, user.email);

        const response = NextResponse.json({ message: 'Login successful', userId: user.id });
        response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        return response;
    } catch (error) {
        console.error('Error in POST /api/auth/login:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}