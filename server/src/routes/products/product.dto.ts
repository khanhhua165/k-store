import { IsString, IsNumberString } from "class-validator";
export default class AddProductDto {
  @IsString()
  public name!: string;

  @IsString()
  public description!: string;

  @IsString()
  public productType!: string;

  @IsString()
  public size!: string;

  @IsNumberString()
  public price!: string;

  @IsNumberString()
  public stock!: string;
}
