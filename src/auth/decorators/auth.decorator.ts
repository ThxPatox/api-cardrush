import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { RolesValidos } from "../interfaces";
import { RoleProtected } from "./role-protected.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";

export function Auth(...roles: RolesValidos[]) {
    return applyDecorators(
        RoleProtected(...roles),

        // SetMetadata('roles',roles),
        UseGuards(AuthGuard(), UserRoleGuard)
    )
}