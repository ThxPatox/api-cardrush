import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main.ts');
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //elimina los campos que no esten en el dto
    forbidNonWhitelisted: true, //arroja un error si hay campos no permitidos
    // transform: true, //transforma los datos a los tipos de datos especificados en el dto
  }));
  const config = new DocumentBuilder().
    setTitle('API de productos').
    setDescription('API de productos').
    setVersion('1.0').
    build();
  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v2/docs', app, documento);
  await app.listen(process.env.PORT || 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
