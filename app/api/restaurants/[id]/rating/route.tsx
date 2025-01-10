import { NextResponse } from 'next/server';
import {readRestaurants, Restaurant, writeRestaurants} from '@/lib/restaurants';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const { rating }: { rating: number } = await request.json();
        const restaurants = readRestaurants();
        const restaurantIndex = restaurants.findIndex((r: Restaurant) => r.id === id);

        if (restaurantIndex !== -1) {
            restaurants[restaurantIndex].rating = rating;
            writeRestaurants(restaurants);
            return NextResponse.json(restaurants[restaurantIndex]);
        } else {
            return NextResponse.json(
                { message: 'Restaurant not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error in PUT /api/restaurants/[id]/rating:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
