import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ArchivosService {
  BuscarArchivoEspecifico(nombreArchivo: string) {
    const path = join(__dirname, '../../static/productos', nombreArchivo);
    if(!existsSync(path)){
      throw new BadRequestException('No se ha encontrado el archivo '+nombreArchivo);
    }
    return path;
  }
}
