import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { filtroArchivos } from './helpers/filtro-archivos.helper';
import { diskStorage } from 'multer';
import { NombradorDeArchivos } from './helpers/nombrador-archivos.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/auth/decorators';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Archivos')
@Controller('archivos')
@Auth()
export class ArchivosController {
  constructor(
    private readonly archivosService: ArchivosService,
    private readonly configService: ConfigService
  ) {}

  @Post('subir-archivos')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter:filtroArchivos,
    storage:diskStorage({
      destination: './static/productos',
      filename: NombradorDeArchivos,
    })
  }))
  SubirArchivosLocales(@UploadedFile() file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException('No se ha enviado ningun archivo controller');
    }
    // return {
    //   nombreOriginal: file.originalname,
    //   path: file.path,
    //   nombreNuevo: file.filename,
    // };
    const secureUrl = `${this.configService.get('HOST_URL')}/archivos/buscar-archivo/${file.filename}`;
    return {
      nombreOriginal: file.originalname,
      path: file.path,
      nombreNuevo: file.filename,
      secureUrl,
    };
  }

  @Get('buscar-archivo/:nombreArchivo')
  BuscarArchivoEspecifico(
    @Param('nombreArchivo') nombreArchivo: string,
    @Res() res: Response
  ) {
    const path = this.archivosService.BuscarArchivoEspecifico(nombreArchivo);

    res.sendFile(path);
  }


}
