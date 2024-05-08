import { SetMetadata } from '@nestjs/common';
import { RolesValidos } from '../interfaces';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: RolesValidos[]) => {
  return SetMetadata(META_ROLES, args);
};
