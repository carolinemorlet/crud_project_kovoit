import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultInterceptor } from './interceptors/defaultInterceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Global example')
    .setDescription('The global API description')
    .setVersion('0.0.1')
    .addTag('globals')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  app.useGlobalInterceptors(new DefaultInterceptor());

  //mise en place de cors
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:8100'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );
  await app.listen(3001);
}

bootstrap();
