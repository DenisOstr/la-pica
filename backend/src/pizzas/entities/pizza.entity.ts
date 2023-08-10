import { ApiProperty } from "@nestjs/swagger";
import { Pizza, Prisma } from "@prisma/client";

export class PizzaEntity implements Pizza {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    ingredients: Prisma.JsonValue;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}