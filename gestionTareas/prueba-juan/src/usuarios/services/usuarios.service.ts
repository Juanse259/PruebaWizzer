import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './../dto/create-usuario.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsuariosService {
  constructor(@InjectRepository(User) private readonly usuarioRepo: Repository<User>) {}

  async createUsuario(usuario: CreateUsuarioDto) {
    if (!usuario.contraUsuario || usuario.contraUsuario.trim() === '') {
      throw new HttpException(
        'La contraseña no puede estar vacía',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!usuario.nombreUsuario || usuario.nombreUsuario.trim() === '') {
      throw new HttpException(
        'No se puede registrar sin nombre de usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundUsuario = await this.usuarioRepo.findOne({
      where: {
        nombreUsuario: usuario.nombreUsuario,
      },
    });

    if (foundUsuario) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }

    const newUsuario = this.usuarioRepo.create({
      ...usuario,
      contraUsuario: await bcryptjs.hash(usuario.contraUsuario, 10), 
  });
    
    return this.usuarioRepo.save(newUsuario);
  }

  async save(usuario: User): Promise<User> {
    return await this.usuarioRepo.save(usuario);
  }

  getUsuario() {
    return this.usuarioRepo.find();
  }

  findOneByNombre(nombreUsuario: string){
    return this.usuarioRepo.findOneBy({ nombreUsuario })
  }

  async findOne(id: number){
    return this.usuarioRepo.findOne({ where: { idUsuario: id } });
  }


}
