import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { IngredientsService } from './ingredients.service';
import { IngredientEntity } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
@ApiTags('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiCreatedResponse({ type: IngredientEntity })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientsService.create(createIngredientDto);
  }

  @Get()
  @ApiOkResponse({ type: IngredientEntity, isArray: true })
  findAll() {
    return this.ingredientsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: IngredientEntity })
  async findOne(@Param('id') id: string) {
    const ingredient = await this.ingredientsService.findOne(+id);

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ${id} does not exist.`);
    }

    return ingredient;
  }

  @Patch(':id')
  @ApiOkResponse({ type: IngredientEntity })
  async update(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientsService.update(+id, updateIngredientDto);

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ${id} does not exist.`);
    }

    return ingredient;
  }

  @Delete(':id')
  @ApiOkResponse({ type: IngredientEntity })
  async remove(@Param('id') id: string) {
    const ingredient = await this.ingredientsService.remove(+id);

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ${id} does not exist.`);
    }
    
    return ingredient;
  }
}
