import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Prio } from './prioridad.entity';
import { User } from '../../usuarios/entities/usuarios.entity';

@Entity({ name: 'tareas' })
export class Task {
  @PrimaryGeneratedColumn()
  idTarea: number;

  @Column()
  tituloTarea: string;

  @Column({ type: 'text' })
  descTarea: string;

  @Column({ default: false })
  completado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreado: Date;

  @Column({ type: 'datetime' })
  fechaVencimiento: Date;

  @Column({ type: 'datetime', nullable: true })
  fechaCompletado: Date;

  @ManyToOne(() => Prio, (prio) => prio.tareas)
  prioridad: Prio;

  @ManyToOne(() => User, (user) => user.tareas)
  asignado: User;
}
