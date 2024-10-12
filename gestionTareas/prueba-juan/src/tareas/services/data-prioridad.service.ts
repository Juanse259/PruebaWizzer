import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prio } from '../entities/prioridad.entity';

@Injectable()
export class DataPrioridadService implements OnModuleInit {
  constructor(
    @InjectRepository(Prio)
    private prioRepository: Repository<Prio>,
  ) {}

  async onModuleInit() {
    await this.init();
  }

  private async init() {
    const priorities = ['alta', 'media', 'baja'];

    for (const tipoPrio of priorities) {
      const exists = await this.prioRepository.findOne({ where: { tipoPrio } });

      if (!exists) {
        try {
          await this.prioRepository
            .createQueryBuilder()
            .insert()
            .into(Prio)
            .values({ tipoPrio })
            .execute();
        } catch (error) {
          console.error(`Error al insertar la prioridad ${tipoPrio}:`, error);
        }
      }
    }
  }
}
