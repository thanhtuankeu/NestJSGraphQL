import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mine api')
    .setDescription('Can do what ever i want, none gonna stop me')
    .setVersion('6.9')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const runningPort = process.env.PORT || 3000;
  process.on('uncaughtException', (err) => {
    console.log(err, 'LOGGER', false);
  });
  app.enableCors();
  await app.listen(runningPort);
  console.log(`Listening on port ${runningPort}`);
}
bootstrap();
