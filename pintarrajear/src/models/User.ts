export interface User {
    _id: string;
    username: string;
    owner: boolean;
    token: string;
    points: number;
}