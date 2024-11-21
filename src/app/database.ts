import Dexie from 'dexie';

export class AppDatabase extends Dexie {
    users: Dexie.Table<User, number>;
    messages: Dexie.Table<Message, number>;

    constructor() {
        super('messagerieApp');
        this.version(1).stores({
            users: '++id, username, name, password',
            messages: '++id, senderId, receiverId, text, timestamp, participants',
        });

        this.users = this.table('users');
        this.messages = this.table('messages');
    }
}

export const db = new AppDatabase();

export interface User {
    id?: number;
    username: string;
    name: string;
    password: string;
}

export interface Message {
    id?: number;
    senderId: number;
    receiverId: number;
    text: string;
    timestamp: Date;
    participants: number[];
}
