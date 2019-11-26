import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import {UserEntity} from '../../auth/entity/user.entity';

@Entity('Profile')
// @Unique(['email'])  // doesnt work, test if fixed
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column({
        type: 'text',
        default: `${process.env.DEV_APP_URL}/profile/avatar/default_avatar.jpg`,
    })
    avatar: string;

    @OneToOne(type => UserEntity, user => user.profile)
    @JoinColumn()
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;
}
