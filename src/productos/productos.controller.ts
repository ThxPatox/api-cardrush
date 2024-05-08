import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginadorDto } from 'src/common/dto/paginador.dto';
import { Auth, GetUserDecorator } from 'src/auth/decorators';
import { RolesValidos } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/auth.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  @Auth(RolesValidos.ADMIN)
  create(
    @Body() createProductoDto: CreateProductoDto,
    @GetUserDecorator() user: User,
  ) {
    return this.productosService.create(createProductoDto,user);
  }

  @Get()
  findAll(@Query() PaginadorDto: PaginadorDto) {
    // console.log(PaginadorDto);
    return this.productosService.findAll(PaginadorDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productosService.findOne(term);
  }

  @Patch(':id')
  @Auth(RolesValidos.USER)
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto, @GetUserDecorator() user: User){
    return this.productosService.update(id, updateProductoDto, user);
  }

  @Delete(':id')
  @Auth(RolesValidos.SUPERADMIN)
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}
