import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateGyerekekDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsBoolean()
    behaviour: boolean;
}
