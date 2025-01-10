import { NextResponse } from 'next/server';
import { readUsers, writeUsers, hashPassword, User } from '@/lib/users';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Проверяем, существует ли пользователь с таким email
        const users = readUsers();
        const userExists = users.some((user: User) => user.email === email);

        if (userExists) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Хэшируем пароль
        const hashedPassword = await hashPassword(password);

        // Создаем нового пользователя
        const newUser: User = {
            id: String(users.length + 1),
            email,
            password: hashedPassword,
        };

        users.push(newUser);
        writeUsers(users);

        return NextResponse.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in POST /api/auth/register:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}