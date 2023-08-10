import { Injectable } from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { calcTotalPrice } from './helpers/calculateTotalPrice';

@Injectable()
export class PizzasService {
  constructor(private prisma: PrismaService) {}

  create(createPizzaDto: CreatePizzaDto) {
    const totalPrice = calcTotalPrice(createPizzaDto.ingredients)

    return this.prisma.pizza.create({
      data: {
        name: createPizzaDto.name,
        price: totalPrice,
        ingredients: JSON.stringify(createPizzaDto.ingredients)
      }
    })
  }

  findAll() {
    return this.prisma.pizza.findMany()
  }

  findOne(id: number) {
    return this.prisma.pizza.findUnique({
      where: { id }
    })
  }

  update(id: number, updatePizzaDto: UpdatePizzaDto) {
    const totalPrice = calcTotalPrice(updatePizzaDto.ingredients)

    return this.prisma.pizza.update({
      where: { id },
      data: {
        name: updatePizzaDto.name,
        price: totalPrice,
        ingredients: JSON.stringify(updatePizzaDto.ingredients)
      }
    })
  }

  remove(id: number) {
    return this.prisma.pizza.delete({
      where: { id }
    })
  }
}
