import {UserEntity} from '../entity/user.entity';

export function checkIpInDB(user: UserEntity, ip: string): boolean {
    return user.ips.some(element => element === ip);
}
