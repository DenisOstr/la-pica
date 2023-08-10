import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { PizzasService } from './pizzas.service';
import { PizzaEntity } from './entities/pizza.entity';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';

@Controller('pizzas')
@ApiTags('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @Post()
  @ApiCreatedResponse({ type: PizzaEntity })
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzasService.create(createPizzaDto);
  }

  @Get()
  @ApiOkResponse({ type: PizzaEntity, isArray: true })
  findAll() {
    return this.pizzasService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: PizzaEntity })
  async findOne(@Param('id') id: string) {
    const pizza = await this.pizzasService.findOne(+id);

    if (!pizza) {
      throw new NotFoundException(`Pizza with ${id} does not exist.`);
    }

    return pizza;
  }

  @Patch(':id')
  @ApiOkResponse({ type: PizzaEntity })
  async update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    const pizza = await this.pizzasService.update(+id, updatePizzaDto);

    if (!pizza) {
      throw new NotFoundException(`Pizza with ${id} does not exist.`);
    }

    return pizza;
  }

  @Delete(':id')
  @ApiOkResponse({ type: PizzaEntity })
  async remove(@Param('id') id: string) {
    const pizza = await this.pizzasService.remove(+id);

    if (!pizza) {
      throw new NotFoundException(`Pizza with ${id} does not exist.`);
    }

    return pizza;
  }
}
