export class CreateTareaDto{
    tituloTarea: string;
    prioridad: number;
    descTarea: string;
    completado: boolean;
    fechaVencimiento: Date;
    asignado: number;
}