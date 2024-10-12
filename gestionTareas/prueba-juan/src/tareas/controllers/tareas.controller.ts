import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request 
} from '@nestjs/common';
import { TareasService } from './../services/tareas.service';
import { CreateTareaDto } from '../dto/create-tarea.dto';
import { UpdateTareaDto } from '../dto/update-tarea.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Controller('tareas')
export class TareasController {
  constructor(private tareasService: TareasService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Request() req) {
    console.log('Usuario autenticado:', req.usuario);
    return this.tareasService.getTarea();
  }

  @UseGuards(AuthGuard)
  @Get('prioridades')
  getAllPrio(@Request() req) {
    console.log('Usuario autenticado:', req.usuario);
    return this.tareasService.getPrio();
  }

  @UseGuards(AuthGuard)
  @Get(':idTarea')
  getOne(@Param('idTarea') idTarea: number, @Request() req) {
    console.log('Usuario autenticado:', req.usuario);
    return this.tareasService.findOne(idTarea);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() newTarea: CreateTareaDto, @Request() req) {
    console.log('Usuario autenticado:', req.usuario);
    return this.tareasService.createTarea(newTarea);
  }

  @UseGuards(AuthGuard)
  @Put(':idTarea')
  update(
    @Request() req,
    @Param('idTarea', ParseIntPipe) idTarea: number,
    @Body() tarea: UpdateTareaDto,
  ) {
    console.log('Usuario autenticado:', req.usuario);
    return this.tareasService.update(idTarea, tarea);
  }

  @UseGuards(AuthGuard)
  @Delete(':idTarea')
  delete(@Param('idTarea', ParseIntPipe) idTarea: number, @Request() req,) {
    console.log('Usuario autenticado:', req.usuario);
    return this.tareasService.delete(idTarea);
  }
}
