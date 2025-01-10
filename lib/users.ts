import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), 'data', 'users.json');

export type User = {
    id: string;
    email: string;
    password: string;
};

function readUsers(): User[] {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

function writeUsers(data: User[]): void {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing users file:', error);
    }
}

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export { readUsers, writeUsers, hashPassword, comparePassword };