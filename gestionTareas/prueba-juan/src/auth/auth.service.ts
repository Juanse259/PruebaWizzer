import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/services/usuarios.service';
import { RegistroDto } from './dto/resgistro.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async registrar({ nombreUsuario, contraUsuario }: RegistroDto) {
    return await this.usuariosService.createUsuario({
      nombreUsuario,
      contraUsuario
    });
  }

  async login({ nombreUsuario, contraUsuario }: LoginDto) {
    if (!contraUsuario || contraUsuario.trim() === '') {
      throw new HttpException('Debe ingresar su clave', HttpStatus.BAD_REQUEST);
    } else if (!nombreUsuario || nombreUsuario.trim() === '') {
      throw new HttpException(
        'Debe ingresar su nombre de usuario',
        HttpStatus.BAD_REQUEST,
      );
    }

    const usuario = await this.usuariosService.findOneByNombre(nombreUsuario);

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const contraValida = await bcryptjs.compare(
      contraUsuario,
      usuario.contraUsuario,
    );

    if (!contraValida) {
      throw new HttpException('La clave no es valida', HttpStatus.UNAUTHORIZED);
    }

    usuario.sesionActiva = true; 
    await this.usuariosService.save(usuario);

    const payload = {
      nombreUsuario: usuario.nombreUsuario,
      sub: usuario.idUsuario,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      usuario,
      token,
    };
  }

  async logout(userId: number) {
    const usuario = await this.usuariosService.findOne(userId);
    
    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    
    usuario.sesionActiva = false; 
    await this.usuariosService.save(usuario); 
  }
}
