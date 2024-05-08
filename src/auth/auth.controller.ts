import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/auth.entity';
import { Auth, GetHeadersDecorator, GetUserDecorator, RoleProtected } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RolesValidos } from './interfaces';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  CheackAuthStatus(@GetUserDecorator() user: User) {
    return this.authService.CheackAuthStatus(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(
    @GetUserDecorator() user: User,
    @GetUserDecorator('email') userEmail: string,
    @GetHeadersDecorator() headersD: string[],
    @Headers() headers: IncomingHttpHeaders[],
  ) {
    console.log('request', user);
    return { user, userEmail, headers, headersD };
  }

  @Get('profilev2')
  @UseGuards(AuthGuard(), UserRoleGuard)
  @SetMetadata('roles', ['admin', 'superadmin'])
  getProfilev2(@GetUserDecorator() user: User) {
    return user;
  }

  @Get('profilev3')
  @RoleProtected(RolesValidos.SUPERADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  // @SetMetadata('roles', ['admin','superadmin'])
  getProfilev3(@GetUserDecorator() user: User) {
    return user;
  }

  @Get('profilev4')
  @Auth(RolesValidos.SUPERADMIN)
  getProfilev4(@GetUserDecorator() user: User) {
    return user;
  }
}
