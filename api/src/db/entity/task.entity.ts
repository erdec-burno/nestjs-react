import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    user: User
}
