import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
     whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  //!Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Escola API')
    .setDescription('API para gerenciamento de alunos')
    .setVersion('1.0')
    .addTag('alunos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
   
  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`Aplicação está rodando na porta: ${await app.getUrl()}`, 'Bootstrap');
}
await bootstrap();
