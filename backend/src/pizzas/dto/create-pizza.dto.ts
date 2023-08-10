import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class Ingredients {
    @IsString()
    name: string;

    @IsNumber()
    price: number;
}

export class CreatePizzaDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    @ValidateNested({ each: true })
    @Type(() => Ingredients)
    ingredients: Ingredients[];
}
