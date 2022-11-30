import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(LoggerMiddleware) // wont work as well
    await app.listen(3000);

}
bootstrap();
