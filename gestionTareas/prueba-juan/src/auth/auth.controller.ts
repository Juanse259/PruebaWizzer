import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/resgistro.dto';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('autenticacion')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  registro(@Body() registroDto: RegistroDto) {
    return this.authService.registrar(registroDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(userId: number) {
    await this.authService.logout(userId); 
  }
}
