import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PizzasModule } from './pizzas/pizzas.module';

@Module({
  imports: [PrismaModule, PizzasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
