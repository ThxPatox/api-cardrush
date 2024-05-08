import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const roles = this._reflector.get<string[]>('roles', context.getHandler());
    const rolesAprobar = this._reflector.get(META_ROLES, context.getHandler());
    if (!rolesAprobar || rolesAprobar.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    // console.log('rolesAprobar', rolesAprobar, 'user.roles', user.roles);
    for (const role of user.roles) {
      if (rolesAprobar.includes(role)) {
        return true;
      }
    }
    // console.log('user', user);
    throw new ForbiddenException(
      `Usuario ${user.username} no tiene permisos, necesita uno de los siguientes roles: [${rolesAprobar}]`,
    );
  }
}
