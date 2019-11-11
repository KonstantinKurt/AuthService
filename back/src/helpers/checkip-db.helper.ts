import {User} from '../auth/interfaces/user.interface';
import {Model} from 'mongoose';

export function checkIpInDB(user: Model<User>, ip: number): boolean {
    return user.ip_address.some(element => element === ip);
}
