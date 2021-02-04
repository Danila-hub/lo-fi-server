import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as CP from 'cookie-parser'
import config from 'src/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(CP(config.cookie_s))
  await app.listen(3000);
}
bootstrap();
