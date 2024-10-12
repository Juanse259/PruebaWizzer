export class UpdateTareaDto {
  tituloTarea?: string;
  asignado: number;
  descTarea: string;
  prioridad: number;
  completado?: boolean;
  fechaVencimiento?: Date;
  fechaCompletado?: Date;
}
