import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

@Entity()
export class Vote {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    upvote:boolean
    
    @Column()
    downvote:boolean

    @ManyToOne(() => Quote, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'quote_id' })
    quote: Quote | null

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User | null
}