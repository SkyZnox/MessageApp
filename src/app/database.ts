import Dexie from 'dexie';

export class AppDatabase extends Dexie {
    users: Dexie.Table<User, number>;
    messages: Dexie.Table<Message, number>;
    group: Dexie.Table<Group, number>;
    groupMessages: Dexie.Table<GroupMessages, number>;

    constructor() {
        super('messagerieApp');
        this.version(1).stores({
            users: '++id, username, name, password, groups',
            messages: '++id, senderId, receiverId, text, timestamp, participants',
            group: '++id, usersId, messages',
            groupMessages: '++id, senderId, text, timestamp'
        });

        this.users = this.table('users');
        this.messages = this.table('messages');
        this.group = this.table('group');
        this.groupMessages = this.table('groupMessages')
    }
}

export const db = new AppDatabase();

export interface User {
    id?: number;
    username: string;
    name: string;
    password: string;
    groupsId: number[];
}

export interface Group{
    id?: number;
    usersId: number[];
    messages: GroupMessages[];
}

export interface GroupMessages{
    id?:number;
    senderId: number;
    text: string;
    timestamp: Date;
}



export interface Message {
    id?: number;
    senderId: number;
    receiverId: number;
    text: string;
    timestamp: Date;
    participants: number[];
}
