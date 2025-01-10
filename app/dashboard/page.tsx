'use client';

import { useEffect, useState } from 'react';
import { getSession } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            if (!session) {
                router.push('/'); // Если пользователь не авторизован, перенаправляем на главную
            } else {
                setUser({ email: session.email });
            }
        };

        fetchSession();
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    };

    if (!user) {
        return <p>Загрузка...</p>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Добро пожаловать, {user.email}!</h1>
            <button onClick={handleLogout} style={{ marginBottom: '20px', color: 'red', cursor: 'pointer' }}>
                Выйти
            </button>
            {/*<AddRestaurantForm />*/}
        </div>
    );
}