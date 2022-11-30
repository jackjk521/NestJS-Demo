import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerMiddleware } from '../logger.middleware';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})

export class CatsModule { }