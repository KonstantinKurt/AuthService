import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn, ManyToOne,
} from 'typeorm';
import {ProfileEntity} from '../../profile/entity/profile.entity';

@Entity('Article')
export class ArticleEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    content: string;

    @Column({
        type: 'text',
        default: ``,
    })
    photo: string;

    @ManyToOne(type => ProfileEntity, profile => profile.articles)
    author: ProfileEntity;

    @CreateDateColumn()
    createdAt: Date;
}
