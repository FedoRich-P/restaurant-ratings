import { NextResponse } from 'next/server';
import { readRestaurants, writeRestaurants } from '@/lib/restaurants';

export async function GET() {
    try {
        const restaurants = readRestaurants();
        return NextResponse.json(restaurants);
    } catch (error) {
        console.error('Error in GET /api/restaurants:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { name, cuisine }: { name: string; cuisine: string } = await request.json();
        const restaurants = readRestaurants();
        const newRestaurant = {
            id: String(restaurants.length + 1),
            name,
            cuisine,
            rating: 0,
        };
        restaurants.push(newRestaurant);
        writeRestaurants(restaurants);
        return NextResponse.json(newRestaurant, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/restaurants:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}