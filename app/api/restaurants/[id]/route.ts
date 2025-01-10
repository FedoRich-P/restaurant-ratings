import { NextResponse } from 'next/server';
import {readRestaurants, Restaurant, writeRestaurants} from '@/lib/restaurants';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const restaurants = readRestaurants();
        const restaurantIndex = restaurants.findIndex((r:Restaurant) => r.id === id);

        if (restaurantIndex !== -1) {
            // Удаляем ресторан из массива
            const deletedRestaurant = restaurants.splice(restaurantIndex, 1)[0];
            writeRestaurants(restaurants);
            return NextResponse.json(deletedRestaurant);
        } else {
            return NextResponse.json(
                { message: 'Restaurant not found' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Error in DELETE /api/restaurants/[id]:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}