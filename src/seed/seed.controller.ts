import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('seed')
  // @Auth(RolesValidos.SUPERADMIN)
  PobalDB() {
    return this.seedService.RunSeed();
  }
  @Get('seed_card')
  PobalDBCard() {
    return this.seedService.RunSeedCard();
  }
}
