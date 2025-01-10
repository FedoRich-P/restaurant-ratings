import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'restaurants.json');

export function readRestaurants() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading restaurants file:', error);
        return [];
    }
}

export function writeRestaurants(data: Restaurant[]) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing restaurants file:', error);
    }
}

export type Restaurant = {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
};