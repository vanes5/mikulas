import { Material } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateJatekokDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEnum(Material)
    @IsNotEmpty()
    material: Material

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    weight: number
}

/* Megnevezés
Anyag (lehetséges értékek: wood, metal, plastic, other)
Súly (kg-ban) */
