import { Module } from '@nestjs/common';
import { TareasService } from './services/tareas.service';
import { TareasController } from './controllers/tareas.controller';
import { Task } from './entities/tareas.entity';
import { Prio } from './entities/prioridad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/usuarios/entities/usuarios.entity';
import { DataPrioridadService } from './services/data-prioridad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Prio, User])],
  providers: [TareasService, DataPrioridadService],
  controllers: [TareasController],
  exports: [TypeOrmModule],
})
export class TareasModule {}
