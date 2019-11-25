import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';

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
        default: 'default_avatar.jpg',
    })
    avatar: string;

    @CreateDateColumn()
    createdAt: string;
}
