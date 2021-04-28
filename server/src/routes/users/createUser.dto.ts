import {
  IsString,
  IsEmail,
  MinLength,
  IsNumber,
  MaxLength,
} from "class-validator";

export default class CreateUserDto {
  @IsString()
  public firstName!: string;

  @IsString()
  public lastName!: string;

  @IsString()
  public userName!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6)
  public password!: string;

  @IsString()
  public address?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(10)
  public phone?: string;
}
