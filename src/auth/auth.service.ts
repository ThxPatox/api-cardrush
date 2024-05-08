import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const hashedPassword = await bcrypt.hashSync(password, 10);
      createUserDto = { ...rest, password: hashedPassword };
      const user = this.userRepository.create(createUserDto);
      const resp = await this.userRepository.save(user);
      delete resp.password;
      return {
        ...resp,
        token: this.getJwtToken({
          id: user.id,
          email: user.email,
          username: user.username,
          roles: user.roles,
        }),
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      // select: { email: true, username: true ,password:true,roles:true },
      select: ['username', 'password', 'email', 'roles', 'id'],
    });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      }),
    };
  }

  async CheackAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Error con la base de datos');
  }
}
