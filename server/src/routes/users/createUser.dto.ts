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

  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6)
  public password!: string;
}
