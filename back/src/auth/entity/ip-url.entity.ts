import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import {UserEntity} from './user.entity';

@Entity('IpUrl')
export class IpUrlEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    hash: string;

    @Column('text')
    ip: string;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;
}
