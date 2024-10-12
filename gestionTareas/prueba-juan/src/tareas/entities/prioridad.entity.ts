import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './tareas.entity';

@Entity({ name: 'prioridad' })
export class Prio {
  @PrimaryGeneratedColumn()
  idPrio: number;

  @Column()
  tipoPrio: string;

  @OneToMany(() => Task, (task) => task.prioridad)
  tareas: Task[];
}
