import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { User } from './entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsuariosService],
  exports:[UsuariosService],
})
export class UsuariosModule {}
