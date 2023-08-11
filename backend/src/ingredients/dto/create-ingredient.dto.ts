import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from 'class-validator';

export class CreateIngredientDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    price: number;
}
