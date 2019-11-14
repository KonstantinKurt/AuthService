import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
} from 'typeorm';
import {
    IsDefined,
} from 'class-validator';
import {Exclude} from 'class-transformer';

@Entity('Profile')
@Unique(['email'])
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'uuid',
    })
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    @IsDefined()
    @Exclude()
    user: string;

    @Column({
        type: 'text',
        default: 'default_avatar.jpg',
    })
    avatar: string;

    @CreateDateColumn()
    @Exclude()
    createdAt: string;
}
