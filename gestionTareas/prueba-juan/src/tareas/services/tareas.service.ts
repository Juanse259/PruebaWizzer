import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './../entities/tareas.entity';
import { CreateTareaDto } from './../dto/create-tarea.dto';
import { UpdateTareaDto } from '../dto/update-tarea.dto';
import { Prio } from '../entities/prioridad.entity';
import { User } from 'src/usuarios/entities/usuarios.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Task) private tareasRepo: Repository<Task>,
    @InjectRepository(Prio) private prioRepo: Repository<Prio>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async getTareasPorUsuario(usuarioId: number) {
 
    const tareasUsuario = await this.tareasRepo.find({
      where: { asignado: { idUsuario: usuarioId } },
      relations: ['asignado', 'prioridad'],
    });
  
    if (tareasUsuario.length === 0) {
      throw new HttpException(
        'No hay tareas para mostrar para este usuario',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return tareasUsuario; 
    }
  }

  async getTarea() {
    const consulTarea = await this.tareasRepo.find({
      relations: ['asignado', 'prioridad'],
    });

    if (consulTarea.length === 0) {
      return new HttpException(
        'No hay tareas para mostrar',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return consulTarea;
    }
  }

  async getPrio() {
    const consulPrio = await this.prioRepo.find();
    if (consulPrio.length === 0) {
      return new HttpException(
        'No hay prioridades para mostrar',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return consulPrio;
    }
  }

  async findOne(idTarea: number) {
    const findTarea = await this.tareasRepo.findOne({
      relations: ['asignado', 'prioridad'],
      where: {
        idTarea: idTarea,
      },
    });

    if (!findTarea) {
      return new HttpException(
        'La tarea buscada no existe',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return findTarea;
    }
  }

  async createTarea(tareaDto: CreateTareaDto) {

    if (!tareaDto.tituloTarea || tareaDto.tituloTarea.trim() === '') {
      throw new HttpException('El título de la tarea no puede estar vacío', HttpStatus.BAD_REQUEST);
    }
  
    if (!tareaDto.descTarea || tareaDto.descTarea.trim() === '') {
      throw new HttpException('La descripción de la tarea no puede estar vacía', HttpStatus.BAD_REQUEST);
    }
  
    if (!tareaDto.fechaVencimiento) {
      throw new HttpException('La fecha de vencimiento no puede estar vacía', HttpStatus.BAD_REQUEST);
    }

    this.validateDates(tareaDto.fechaVencimiento);

    const newTarea = this.tareasRepo.create({
      tituloTarea: tareaDto.tituloTarea,
      descTarea: tareaDto.descTarea,
      completado: tareaDto.completado,
      fechaVencimiento: tareaDto.fechaVencimiento,
    });

    const prioridad = await this.prioRepo.findOne({
      where: { idPrio: tareaDto.prioridad },
    });
    const usuario = await this.userRepo.findOne({
      where: { idUsuario: tareaDto.asignado },
    });

    if (!prioridad) {
      throw new HttpException('Prioridad no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    newTarea.prioridad = prioridad;
    newTarea.asignado = usuario;

    return await this.tareasRepo.save(newTarea);
  }

  async update(idTarea: number, TareaUpdate: UpdateTareaDto) {
    this.validateDates(
      TareaUpdate.fechaVencimiento,
      TareaUpdate.fechaCompletado,
    );

    const tarea = await this.tareasRepo.findOne({ where: { idTarea } });

    if (!tarea) {
      throw new HttpException(
        'La tarea no fue encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const prioridad = await this.prioRepo.findOne({
      where: { idPrio: TareaUpdate.prioridad },
    });
    const usuario = await this.userRepo.findOne({
      where: { idUsuario: TareaUpdate.asignado },
    });

    if (!prioridad) {
      throw new HttpException('Prioridad no encontrada', HttpStatus.NOT_FOUND);
    }

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    tarea.prioridad = prioridad;
    tarea.asignado = usuario;

    // se asignan solo los campos que se están actualizando
    Object.assign(tarea, TareaUpdate);

    return await this.tareasRepo.save(tarea);
  }

  async delete(idTarea: number) {
    const result = await this.tareasRepo.delete({ idTarea: idTarea });

    if (result.affected === 0) {
      throw new HttpException(
        'La tarea no fue encontrada para eliminar',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.tareasRepo.delete({ idTarea });
  }

  private validateDates(fechaVencimiento: Date, fechaCompletado?: Date) {
    const hoy = new Date();

    // Validar que la fecha de vencimiento no sea anterior a la fecha actual
    if (fechaVencimiento && new Date(fechaVencimiento) < hoy) {
      throw new HttpException(
        'La fecha de vencimiento no puede ser anterior a la fecha actual',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Si se pone la fecha de completado, se valida que no sea anterior a la fecha actual
    if (fechaCompletado && new Date(fechaCompletado) < hoy) {
      throw new HttpException(
        'La fecha de completado no puede ser anterior a la fecha actual',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
