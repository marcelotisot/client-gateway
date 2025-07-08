import { 
  IsNotEmpty, 
  IsString, 
  MaxLength 
} from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  name: string;
}
