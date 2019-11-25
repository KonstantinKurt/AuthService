import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import {ProfileEntity} from '../../profile/entity/profile.entity';

@Entity('User')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column({
        type: 'text',
        default: 'User',
    })
    role: string;

    @Column({
        type: 'text',
        array: true
    })
    ips: string[];

    @OneToOne(type => ProfileEntity)
    @JoinColumn()
    profile: ProfileEntity;

    @CreateDateColumn()
    createdAt: string;
}
