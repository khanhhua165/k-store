import { IsString, IsNumber } from "class-validator";
export default class AddProductDto {
  @IsString()
  public name!: string;

  @IsString()
  public description!: string;

  @IsString()
  public productType!: string;

  @IsString()
  public subType!: string;

  @IsString()
  public image!: string;

  @IsNumber()
  public price!: number;

  @IsNumber()
  public stock!: number;

  @IsNumber()
  public sold!: number;
}
