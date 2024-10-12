import { Task } from '../../tareas/entities/tareas.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'usuarios' })
export class User {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ unique: true })
  nombreUsuario: string;

  @Column()
  contraUsuario: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreado: Date;

  @Column({ default: false }) 
  sesionActiva: boolean;

  @OneToMany(() => Task, (task) => task.asignado)
  tareas: Task[];
}
