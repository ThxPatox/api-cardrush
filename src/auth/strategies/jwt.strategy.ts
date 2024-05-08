import { User } from './../entities/auth.entity';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
){
    super({
        secretOrKey:configService.get('JWT_SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
}

    async validate(payload: JwtPayload): Promise<User>{
        const {id, email, username, roles} = payload;
        const user = await this.userRepository.findOneBy({email});
        if(!user){
            throw new UnauthorizedException('Token no valido');
        }
        if(!user.isActive){
            throw new UnauthorizedException('Usuario inactivo');
        }
        return user;
    }
}