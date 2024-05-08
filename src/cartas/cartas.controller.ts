import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CartasService } from './cartas.service';
import { CreateCartaDto } from './dto/create-carta.dto';
import { UpdateCartaDto } from './dto/update-carta.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUserDecorator } from 'src/auth/decorators';
import { User } from 'src/auth/entities/auth.entity';
import { RolesValidos } from 'src/auth/interfaces';
import { PaginadorDto } from 'src/common/dto/paginador.dto';

@ApiTags('Cartas')
@Controller('cartas')
export class CartasController {
  constructor(private readonly cartasService: CartasService) {}

  @Post()
  @Auth(RolesValidos.ADMIN,RolesValidos.SUPERADMIN)
  create(
    @Body() createProductoDto: CreateCartaDto,
    @GetUserDecorator() user: User,
  ) {
    return this.cartasService.create(createProductoDto, user);
  }

  @Get()
  findAll(@Query() PaginadorDto: PaginadorDto) {
    return this.cartasService.findAll(PaginadorDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.cartasService.findOne(term);
  }

  @Patch(':id')
  @Auth(RolesValidos.EDITOR, RolesValidos.ADMIN,RolesValidos.SUPERADMIN)
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateCartaDto,
    @GetUserDecorator() user: User,
  ) {
    return this.cartasService.update(id, updateProductoDto, user);
  }

  @Delete(':id')
  @Auth(RolesValidos.SUPERADMIN,RolesValidos.ADMIN)
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.cartasService.remove(id);
  }
}
