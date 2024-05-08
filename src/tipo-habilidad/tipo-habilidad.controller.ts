import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoHabilidadService } from './tipo-habilidad.service';
import { CreateTipoHabilidadDto } from './dto/create-tipo-habilidad.dto';
import { UpdateTipoHabilidadDto } from './dto/update-tipo-habilidad.dto';

@Controller('tipo-habilidad')
export class TipoHabilidadController {
  constructor(private readonly tipoHabilidadService: TipoHabilidadService) {}

  // @Post()
  // create(@Body() createTipoHabilidadDto: CreateTipoHabilidadDto) {
  //   return this.tipoHabilidadService.create(createTipoHabilidadDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tipoHabilidadService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tipoHabilidadService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTipoHabilidadDto: UpdateTipoHabilidadDto) {
  //   return this.tipoHabilidadService.update(+id, updateTipoHabilidadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tipoHabilidadService.remove(+id);
  // }
}
