import { User } from './user.interface';

export interface ApiResponse {
    user: User;
    token: string;
}