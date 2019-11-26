import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
    OneToOne,
    JoinColumn, OneToMany,
} from 'typeorm';
import {UserEntity} from '../../auth/entity/user.entity';
import {ArticleEntity} from '../../article/entity/article.entity';

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

    @OneToMany(type => ArticleEntity, article => article.author, {
        cascade: true,
    })
    articles: ArticleEntity[];

    @CreateDateColumn()
    createdAt: Date;
}
