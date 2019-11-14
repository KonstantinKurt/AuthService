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
    user: string;

    @Column({
        type: 'text',
        default: '',
    })
    avatar: string;

    @CreateDateColumn()
    createdAt: string;
}
