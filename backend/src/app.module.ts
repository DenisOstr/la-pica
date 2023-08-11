import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [PrismaModule, PizzasModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
