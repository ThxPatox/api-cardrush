import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoCartaService } from './tipo-carta.service';
import { CreateTipoCartaDto } from './dto/create-tipo-carta.dto';
import { UpdateTipoCartaDto } from './dto/update-tipo-carta.dto';

@Controller('tipo-carta')
export class TipoCartaController {
  constructor(private readonly tipoCartaService: TipoCartaService) {}

  // @Post()
  // create(@Body() createTipoCartaDto: CreateTipoCartaDto) {
  //   return this.tipoCartaService.create(createTipoCartaDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tipoCartaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tipoCartaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTipoCartaDto: UpdateTipoCartaDto) {
  //   return this.tipoCartaService.update(+id, updateTipoCartaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tipoCartaService.remove(+id);
  // }
}
