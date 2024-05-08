import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ArchivosController],
  providers: [ArchivosService],
  imports: [ConfigModule,AuthModule],
})
export class ArchivosModule {}
