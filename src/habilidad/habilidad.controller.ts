import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';

@Controller('habilidad')
export class HabilidadController {
  constructor(private readonly habilidadService: HabilidadService) {}

  // @Post()
  // create(@Body() createHabilidadDto: CreateHabilidadDto) {
  //   return this.habilidadService.create(createHabilidadDto);
  // }

  // @Get()
  // findAll() {
  //   return this.habilidadService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.habilidadService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHabilidadDto: UpdateHabilidadDto) {
  //   return this.habilidadService.update(+id, updateHabilidadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.habilidadService.remove(+id);
  // }
}
