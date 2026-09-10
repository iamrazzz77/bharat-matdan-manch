import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  const port = process.env.NEST_PORT || 4000;
  await app.listen(port);
  console.log(`Bharat Matdan Manch NestJS Backend Microservice running on port ${port}`);
}
bootstrap();
